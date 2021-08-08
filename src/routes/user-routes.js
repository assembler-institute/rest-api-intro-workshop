const Router = require("express").Router;

const { userController, authController } = require("../controllers");
const {
  authMiddleware: { checkToken, isAdmin },
  userMiddleware: { validateRoles },
} = require("../middlewares");

const userRouter = Router();

// Movies requests
// userRouter.get("/", userController.fetchPersons);
userRouter.post("/signin", authController.signIn);
userRouter.post(
  "/signup",
  [checkToken, isAdmin, validateRoles],
  userController.registerUser,
);
userRouter.get("/", [checkToken, isAdmin], userController.fetchUsers);
userRouter.get("/:id", [checkToken, isAdmin], userController.fetchUserById);
userRouter.patch(
  "/:id",
  [checkToken, isAdmin, validateRoles],
  userController.patchUser,
);
// userRouter.delete("/:id", userController.deletePerson);

module.exports = {
  userRouter,
};
