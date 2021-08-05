const express = require("express");
const helmet = require("helmet");
const { json } = require("body-parser");

// middleware
app.use(helmet());
app.use(json());

// routes

// Default routes
app.get("/", (req, res) => {
  res.status(200).send({
    message: "Welcome to my First REST API",
  });
});
