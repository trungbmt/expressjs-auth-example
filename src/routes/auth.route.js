const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");
const {
  registerValidationRules,
  validate,
} = require("../validators/auth.validator");

router.post("/login", authController.login);
router.post(
  "/register",
  registerValidationRules(),
  validate,
  authController.register
);
module.exports = router;
