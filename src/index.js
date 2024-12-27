const express = require("express");
const app = express();
const { PORT } = require("./config/serverConfig");

const startServer = async () => {
  app.listen(PORT, () => {
    console.log(`server started at ${PORT}`);
  });
};

startServer();
