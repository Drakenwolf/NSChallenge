import express, { Application } from "express";


const user = require("./user");
const task = require("./task");

const routes = function (server:  Application) {
  server.use("/user", user);
  server.use("/task", task);
};

module.exports = router;