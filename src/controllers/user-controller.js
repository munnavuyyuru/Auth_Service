// const { StatusCodes } = require("http-status-codes");
const UserService = require("../services/user-Service");

const userService = new UserService();

const create = async (req, res) => {
  try {
    const response = await userService.create({
      email: req.body.email,
      password: req.body.password,
    });
    res.status(201).json({
      data: response,
      success: true,
      message: "Successfully created a user",
      error: {},
    });
  } catch (error) {
    // res.status(500).json({
    //   data: {},
    //   success: false,
    //   message: "Failed to create a user",
    //   error: error,
    // });
    return res.status(error.statusCode).json({
      message: error.message,
      data: {},
      success: false,
      err: error.explanation,
    });
  }
};

const signIn = async (req, res) => {
  try {
    const response = await userService.signIn(
      req.body.email,
      req.body.password
    );
    res.status(200).json({
      data: response,
      success: true,
      message: "User signed in successfully",
      error: {},
    });
  } catch (error) {
    res.status(500).json({
      data: {},
      success: false,
      message: "Failed to sign in user",
      error: error,
    });
  }
};

const isAuthenticated = async (req, res) => {
  try {
    const token = req.headers["x-access-token"];
    const response = await userService.isAuthenticated(token);
    return res.status(200).json({
      data: response,
      success: true,
      message: "User is Authenticated and token is valid",
      error: {},
    });
  } catch (error) {
    res.status(500).json({
      data: {},
      success: false,
      message: "somethig went wrong",
      error: error,
    });
  }
};

const isAdmin = async (req, res) => {
  try {
    const response = await userService.isAdmin(req.body.id);
    const msg = response ? "User is Admin" : "User is not Admin";
    return res.status(200).json({
      data: response,
      success: true,
      message: msg,
      error: {},
    });
  } catch (error) {
    res.status(500).json({
      data: {},
      success: false,
      message: "Something went wrong",
      error: error,
    });
  }
};

module.exports = {
  create,
  signIn,
  isAuthenticated,
  isAdmin,
};
