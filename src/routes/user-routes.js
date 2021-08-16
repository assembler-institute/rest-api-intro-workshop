const Router = require("express").Router;

const { userController } = require("../controllers");
const {
  authMiddleware: { checkTokenFirebase, isAdmin },
  userMiddleware: { validateRoles },
} = require("../middlewares");

const userRouter = Router();

// ---
// User requests
userRouter.get("/", [checkTokenFirebase, isAdmin], userController.fetchUsers);
userRouter.get(
  "/:id",
  [checkTokenFirebase, isAdmin],
  userController.fetchUserById,
);
userRouter.patch(
  "/:id",
  [checkTokenFirebase, isAdmin, validateRoles],
  userController.patchUser,
);
userRouter.delete(
  "/:id",
  [checkTokenFirebase, isAdmin],
  userController.deleteUser,
);

// ---
// Account requests
userRouter.post(
  "/sign-in",
  [checkTokenFirebase, validateRoles],
  userController.signIn,
);
// userRouter.post(
//   "/sign-up",
//   [checkTokenFirebase, isAdmin, validateRoles],
//   userController.registerUser,
// );
// userRouter.post("/refresh-token", authController.updateAccessToken);
// userRouter.post("/sign-out", authController.rejectToken);

module.exports = {
  userRouter,
};
