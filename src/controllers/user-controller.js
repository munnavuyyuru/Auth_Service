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
    res.status(500).json({
      data: {},
      success: false,
      message: "Failed to create a user",
      error: error,
    });
  }
};

module.exports = {
  create,
};
