const cors = require("cors");
const express = require("express");

const projectRouter = require("../data/routers/projectRouter");
const actionRouter = require("../data/routers/actionRouter");

// const db = require("../data/dbConfig.js");

const server = express();

function logger(req, res, next) {
  console.log(`${req.method} to ${req.url} at ${Date.now()}`);

  next();
}

server.use(logger);
server.use(express.json());
server.use(cors());
server.use("/api/projects", projectRouter);
server.use("/api/actions", actionRouter);

server.get("/", (req, res) => {
  res.send(`<h1>Katie McKnight's Web API Sprint Challenge</h1>`);
});

module.exports = server;
