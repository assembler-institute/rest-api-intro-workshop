const mongoose = require("mongoose");
const express = require("express");
const helmet = require("helmet");
const { json } = require("body-parser");
const morgan = require("morgan");
const { movieRouter, personRouter, userRouter } = require("./routes");
const { authMiddleware } = require("./middlewares");
const cors = require("cors");

// express
const app = express();

// middleware
mongoose.set("toJSON", { virtuals: true });
app.use(morgan("dev"));
app.use(helmet());
app.use(json());
app.use(cors());

// routes
app.use("/users", userRouter);
app.use("/", authMiddleware.checkTokenFirebase);
app.use("/movies", movieRouter);
app.use("/persons", personRouter);

// Default routes
app.get("/", (req, res) => {
  res.status(200).send({
    message: "Welcome to my First REST API",
  });
});

module.exports = app;
