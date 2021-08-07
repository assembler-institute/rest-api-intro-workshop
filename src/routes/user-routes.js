const Router = require("express").Router;

const { userController, authController } = require("../controllers");
const {
  authMiddleware: { checkToken, isAdmin },
} = require("../middlewares");

const userRouter = Router();

// Movies requests
// userRouter.get("/", userController.fetchPersons);
userRouter.post("/", [checkToken, isAdmin], userController.signUp);
userRouter.post("/signin", authController.signIn);
// userRouter.get("/:id", userController.fetchPersonById);
// userRouter.patch("/:id", userController.patchPerson);
// userRouter.delete("/:id", userController.deletePerson);

module.exports = {
  userRouter,
};
