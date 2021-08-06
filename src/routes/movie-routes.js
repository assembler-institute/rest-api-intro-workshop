const Router = require("express").Router;

const { movieController } = require("../controllers");

const movieRouter = Router();

movieRouter.get("/", movieController.fetchMovies);
movieRouter.patch("/:id", movieController.patchMovie);

module.exports = {
  movieRouter,
};
