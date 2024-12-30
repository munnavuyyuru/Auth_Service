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

router.get("/isAuthenticated", userController.isAuthenticated);

router.get(
  "/isAdmin",
  authRequestValidator.validateIsAdminRequest,
  userController.isAdmin
);

module.exports = router;
