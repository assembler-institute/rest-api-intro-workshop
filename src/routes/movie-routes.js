const Router = require("express").Router;

const { movieController } = require("../controllers");

const movieRouter = Router();

movieRouter.get("/", movieController.fetchMovies);
movieRouter.post("/", movieController.postMovie);
movieRouter.get("/:id", movieController.fetchMovieById);
movieRouter.patch("/:id", movieController.patchMovie);
movieRouter.delete("/:id", movieController.deleteMovie);

module.exports = {
  movieRouter,
};
