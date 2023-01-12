const { validateEmail, validateLength } = require("../helpers/validation");
const User = require("../models/User");
const bcrypt = require("bcrypt");

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
    console.log(cryptedPassword);
    const user = await new User({
      first_name,
      last_name,
      username,
      email,
      password: cryptedPassword,
      bYear,
      bMonth,
      bDay,
      gender,
    }).save();
    user.password = undefined;
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
