const express = require("express");
const router = express.Router();

const userController = require("../../controllers/user-controller");
const { authRequestValidator } = require("../../middlewares/index");

router.post(
  "/signup",
  authRequestValidator.validateUserAuth,
  userController.create
);
router.post(
  "/signin",
  authRequestValidator.validateUserAuth,
  userController.signIn
);

module.exports = router;
