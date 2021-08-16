const Router = require("express").Router;

const { personController } = require("../controllers");
// const { validateCastCrew } = require("../middlewares");

const personRouter = Router();

// Movies requests
personRouter.get("/", personController.fetchPersons);
personRouter.post("/", personController.postPerson);
personRouter.get("/:id", personController.fetchPersonById);
personRouter.patch("/:id", personController.patchPerson);
personRouter.delete("/:id", personController.deletePerson);

module.exports = {
  personRouter,
};
