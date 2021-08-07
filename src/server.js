const express = require("express");
const helmet = require("helmet");
const { json } = require("body-parser");
const morgan = require("morgan");
const { movieRouter, personRouter } = require("./routes");

// express
const app = express();

// middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(json());

// routes
app.use("/movies", movieRouter);
app.use("/persons", personRouter);

// Default routes
app.get("/", (req, res) => {
  res.status(200).send({
    message: "Welcome to my First REST API",
  });
});

module.exports = app;
