const Router = require("express").Router;

const { userController } = require("../controllers");

const userRouter = Router();

// Movies requests
// userRouter.get("/", userController.fetchPersons);
userRouter.post("/", userController.signUp);
// userRouter.get("/:id", userController.fetchPersonById);
// userRouter.patch("/:id", userController.patchPerson);
// userRouter.delete("/:id", userController.deletePerson);

module.exports = {
  userRouter,
};
