const Router = require("express").Router;

const { movieController } = require("../controllers");

const movieRouter = Router();

movieRouter.get("/", movieController.fetchMovies);

module.exports = {
  movieRouter,
};
