const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const { PORT } = require("./config/serverConfig");
const apiRoutes = require("./routes/index");

// const UserService = require("./services/user-Service");

const startServer = async () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/api", apiRoutes);

  app.listen(PORT, async () => {
    console.log(`server started at ${PORT}`);
    // const user = new UserService();
    // const token = user.createToken({ email: "hello@damin.com", id: 3 });
    // console.log(token);
    // const verify = user.verifyToken(token);
    // console.log(verify);
  });
};

startServer();
