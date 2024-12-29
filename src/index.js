const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const { PORT } = require("./config/serverConfig");
const apiRoutes = require("./routes/index");

// const UserRepository = require("./repository/user-Repository");

const startServer = async () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/api", apiRoutes);

  app.listen(PORT, async () => {
    console.log(`server started at ${PORT}`);
    // const repo = new UserRepository();
    // const user = await repo.getById(2);
    // console.log(user.dataValues);
  });
};

startServer();
