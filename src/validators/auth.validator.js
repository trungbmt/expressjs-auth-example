const { body, validationResult } = require("express-validator");

exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ errors: errors.array(), message: "Invalid data input!" });
  }
  next();
};

exports.registerValidationRules = () => {
  return [body("email").isEmail().notEmpty(), body("password").notEmpty()];
};
