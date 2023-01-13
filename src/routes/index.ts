import express, { Application } from "express";


const user = require("./user");

const routes = function (server:  Application) {
  server.use("/user", user);
};

module.exports = routes;