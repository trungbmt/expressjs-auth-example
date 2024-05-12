const User = require("../models/users");

getAll = async (req, res) => {
  const users = await User.find({});
  res.json({ users });
};
module.exports = { getAll };
