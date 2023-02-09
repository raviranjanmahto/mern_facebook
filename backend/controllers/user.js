const {
  validateEmail,
  validateLength,
  validateUsername,
} = require("../helpers/validation");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { generateToken } = require("../helpers/tokens");
const { sendVerificationEmail } = require("../helpers/mailer");

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

exports.resendVerification = () => {};
