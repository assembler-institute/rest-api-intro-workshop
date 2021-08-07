const Router = require("express").Router;

const { movieController } = require("../controllers");
const { validateCastCrew } = require("../middlewares");

const movieRouter = Router();

// Movies requests
movieRouter.get("/", movieController.fetchMovies);
movieRouter.post("/", movieController.postMovie);
movieRouter.get("/:id", movieController.fetchMovieById);
movieRouter.patch("/:id", movieController.patchMovie);
movieRouter.delete("/:id", movieController.deleteMovie);

// Credits requests
movieRouter.get("/:id/credits", movieController.fetchCredits);
movieRouter.post("/:id/credits", validateCastCrew, movieController.postCredits);
movieRouter.patch("/:id/credits", movieController.patchCredits);
movieRouter.delete("/:id/credits/:creditId", movieController.deleteCredits);

module.exports = {
  movieRouter,
};
