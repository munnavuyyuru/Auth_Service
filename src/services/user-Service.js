const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { JWT_KEY } = require("../config/serverConfig");
const UserRepository = require("../repository/user-Repository");

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async create(data) {
    try {
      const user = await this.userRepository.create(data);
      return user;
    } catch (error) {
      console.log("Something went wrong in the service layer");
      throw error;
    }
  }

  async signIn(email, userPassword) {
    try {
      // Fetch user by the email
      const user = await this.userRepository.getByEmail(email);

      // Compare incoming password and encrypted password
      const passwordMatch = await this.checkPassword(
        userPassword,
        user.password
      );

      if (!passwordMatch) {
        console.log("Password doesn't match");
        throw { error: "Incorrect password" };
      }
      // If match, create a token and send it to user
      const newJWT = this.createToken({ email: user.email, id: user.id });
      return newJWT;
    } catch (error) {
      console.error("Something went wrong in the sign-in process:", error);
      throw error;
    }
  }

  async isAuthenticated(token) {
    try {
      const response = await this.verifyToken(token);
      if (!response) {
        throw { error: "Invalid token" };
      }
      const user = await this.userRepository.getById(response.id);
      if (!user) {
        throw { error: "No user found with this token" };
      }
      return user.id;
    } catch (error) {
      console.error("Something went wrong in the authentication process");
      throw error;
    }
  }

  createToken(user) {
    try {
      const result = jwt.sign(user, JWT_KEY, { expiresIn: "1h" });
      return result;
    } catch (error) {
      console.error("Something went wrong in Token creation");
      throw error;
    }
  }

  verifyToken(token) {
    try {
      const response = jwt.verify(token, JWT_KEY);
      return response;
    } catch (error) {
      console.error("Something went wrong in Token validation :", error);
      throw error;
    }
  }

  async checkPassword(userPassword, encryptedPassword) {
    try {
      return await bcrypt.compare(userPassword, encryptedPassword);
    } catch (error) {
      console.error("Something went wrong in password comparison:", error);
      throw error;
    }
  }
}

module.exports = UserService;
