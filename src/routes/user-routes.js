const Router = require("express").Router;

const { userController, authController } = require("../controllers");
const {
  authMiddleware: { checkToken, isAdmin },
  userMiddleware: { validateRoles },
} = require("../middlewares");

const userRouter = Router();

// User requests
userRouter.get("/", [checkToken, isAdmin], userController.fetchUsers);
userRouter.get("/:id", [checkToken, isAdmin], userController.fetchUserById);
userRouter.post("/signin", authController.signIn);

userRouter.post(
  "/signup",
  [checkToken, isAdmin, validateRoles],
  userController.registerUser,
);

userRouter.patch(
  "/:id",
  [checkToken, isAdmin, validateRoles],
  userController.patchUser,
);

userRouter.delete("/:id", [checkToken, isAdmin], userController.deleteUser);

module.exports = {
  userRouter,
};
