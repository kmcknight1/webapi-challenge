const express = require("express");

const projectRouter = require("../data/routers/projectRouter");
const actionRouter = require("../data/routers/actionRouter");

const server = express();

server.use(express.json());
server.use("/api/projects", projectRouter);
server.use("/api/actions", actionRouter);

server.get("/", (req, res) => {
  res.send(`<h1>Katie McKnight's Web API Sprint Challenge</h1>`);
});

module.exports = server;
