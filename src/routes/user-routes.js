const Router = require("express").Router;

const { userController, authController } = require("../controllers");
const {
  authMiddleware: { checkToken, isAdmin },
  userMiddleware: { validateRoles },
} = require("../middlewares");

const userRouter = Router();

// ---
// User requests
userRouter.get("/", [checkToken, isAdmin], userController.fetchUsers);
userRouter.get("/:id", [checkToken, isAdmin], userController.fetchUserById);
userRouter.patch(
  "/:id",
  [checkToken, isAdmin, validateRoles],
  userController.patchUser,
);
userRouter.delete("/:id", [checkToken, isAdmin], userController.deleteUser);

// ---
// Account requests
userRouter.post("/signin", authController.signIn);
userRouter.post(
  "/signup",
  [checkToken, isAdmin, validateRoles],
  userController.registerUser,
);
userRouter.post("/refresh-token", authController.updateAccessToken);

module.exports = {
  userRouter,
};
