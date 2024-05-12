const User = require("../models/users");
const jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
require("dotenv").config();

login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    user.toJSON = function () {
      const obj = this.toObject();
      delete obj.password;
      return obj;
    };

    res.json({ message: "Login successful", token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
register = async (req, res) => {
  const { email, password } = req.body;
  const user = new User({
    email: email,
    password: bcrypt.hashSync(password, 10),
  });
  try {
    await user.save();
    return res.status(201).json({ message: "Register successfully!" });
  } catch (error) {
    if (error?.code === 11000) {
      return res.status(400).json({
        message: "This email address already exists, please log in!",
      });
    }
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
logout = async () => {};

module.exports = { login, register, logout };
