const {
  validateEmail,
  validateLength,
  validateUsername,
} = require("../helpers/validation");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { generateToken } = require("../helpers/tokens");
const { sendVerificationEmail, sendResetCode } = require("../helpers/mailer");
const Code = require("../models/code");
const { generateCode } = require("../helpers/generateCode");

exports.register = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      username,
      email,
      password,
      bYear,
      bMonth,
      bDay,
      gender,
    } = req.body;

    if (
      !first_name ||
      !last_name ||
      !email ||
      !password ||
      !bYear ||
      !bMonth ||
      !bDay ||
      !gender
    ) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email address" });
    }

    const check = await User.findOne({ email });
    if (check) {
      return res.status(400).json({
        message: "This email address already exists!, Please login",
      });
    }

    if (!validateLength(first_name, 2, 24)) {
      return res.status(400).json({
        message: "first name must be between 2 to 24 character!",
      });
    }
    if (!validateLength(last_name, 2, 24)) {
      return res.status(400).json({
        message: "last name must be between 2 to 24 character!",
      });
    }
    if (!validateLength(password, 6, 40)) {
      return res.status(400).json({
        message: "password must be between 6 to 40 character!",
      });
    }

    const cryptedPassword = await bcrypt.hash(password, 11);

    let tempUsername = await (first_name + last_name)
      .toLowerCase()
      .replace(/ /g, "");
    let newUsername = await validateUsername(tempUsername);

    const user = await new User({
      first_name,
      last_name,
      username: newUsername,
      email,
      password: cryptedPassword,
      bYear,
      bMonth,
      bDay,
      gender,
    }).save();
    const emailVerificationToken = generateToken(
      { id: user._id.toString() },
      process.env.VERIFICATION_EXPIRE
    );
    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
    sendVerificationEmail(user.email, user.first_name, url);
    // user.password = undefined;
    const token = generateToken(
      { id: user._id.toString() },
      process.env.LOGIN_EXPIRE
    );
    res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      verified: user.verified,
      message: "Register Success! please activate your account",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.activateAccount = async (req, res) => {
  try {
    const validUser = req.user.id;
    const { token } = req.body;
    const user = jwt.verify(token, process.env.TOKEN_SECRET);
    const check = await User.findById(user.id);
    if (validUser !== user.id) {
      return res
        .status(400)
        .json({ message: "You don't have permission to perform this action!" });
    }
    if (check.verified == true) {
      return res
        .status(400)
        .json({ message: "This account is already activated!" });
    } else {
      await User.findByIdAndUpdate(user.id, { verified: true });
      return res
        .status(200)
        .json({ message: "Account has been activated successfully!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email address" });
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res
        .status(400)
        .json({ message: "This email address not exist, please register." });
    }
    const check = await bcrypt.compare(password, user.password);
    if (!check) {
      return res.status(400).json({ message: "Invalid Credentials!!!." });
    }
    const token = generateToken(
      { id: user._id.toString() },
      process.env.LOGIN_EXPIRE
    );
    res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      verified: user.verified,
      message: "Login Success!",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.resendVerification = async (req, res) => {
  try {
    const id = req.user.id;
    const user = await User.findById(id);
    if (user.verified === true) {
      return res
        .status(400)
        .json({ message: "This account is already activated!" });
    }
    const emailVerificationToken = generateToken(
      { id: user._id.toString() },
      process.env.VERIFICATION_EXPIRE
    );
    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
    sendVerificationEmail(user.email, user.first_name, url);
    return res.status(200).json({
      message: "Email verification link has been sent to your email.",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.findUser = async (req, res) => {
  try {
    const { email } = req.body;
    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email address" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Account does not exist!" });
    }
    return res.status(200).json({ email: user.email, picture: user.picture });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.sendResetPasswordCode = async (req, res) => {
  try {
    const { email } = req.body;
    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email address" });
    }
    const user = await User.findOne({ email });
    await Code.findOneAndRemove({ user: user._id });
    const code = generateCode(6);
    await new Code({
      user: user._id,
      code: code.code,
      codeExpire: code.codeExpire,
    }).save();
    sendResetCode(user.email, user.first_name, code.code);
    return res
      .status(200)
      .json({ message: "Email reset code has been sent to your email." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.validateResetCode = async (req, res) => {
  try {
    const { email, code } = req.body;
    if (!code)
      return res
        .status(400)
        .json({ message: "Verification code is required!" });

    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email address" });
    }
    const user = await User.findOne({ email });
    const dbCode = await Code.findOne({ user: user._id });
    const currDate = Math.ceil(+new Date() / 1000);

    if (dbCode.code !== code) {
      return res
        .status(400)
        .json({ message: "Verification code is not match!." });
    }
    if (currDate > dbCode.codeExpire) {
      return res
        .status(400)
        .json({ message: "Verification code is expired!." });
    }
    return res.status(200).json({ message: "Verification code is correct." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { email, password, code } = req.body;
    if (!password || !code)
      return res.status(400).json({ message: "All fields are required!" });

    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email address" });
    }
    const user = await User.findOne({ email });
    const dbCode = await Code.findOne({ user: user._id });
    const currDate = Math.ceil(+new Date() / 1000);

    if (dbCode.code !== code) {
      return res
        .status(400)
        .json({ message: "Verification code is not match!." });
    }
    if (currDate > dbCode.codeExpire) {
      return res
        .status(400)
        .json({ message: "Verification code is expired!." });
    }
    const cryptedPassword = await bcrypt.hash(password, 11);
    await User.findOneAndUpdate({ email }, { password: cryptedPassword });
    return res
      .status(200)
      .json({ message: "Password has been changed successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
