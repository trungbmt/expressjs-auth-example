const express = require("express");
const router = express.Router();
const { authenticateJWT } = require("../middlewares/authenticate.middleware");

const userController = require("../controllers/user.controller");

router.get("", authenticateJWT, userController.getAll);

module.exports = router;
