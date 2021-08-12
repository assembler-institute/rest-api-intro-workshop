const { userController } = require("../controllers")
const Router = require("express").Router;
//const  app  = require("../server")
const userRouter = Router();
const { userExistsMiddleweare,userNotExistsMiddleweare, authMiddleweare } = require("../middlewears")




userRouter.post("/",userController.refreshTokken);
userRouter.post("/signUp",userExistsMiddleweare,userController.register);
userRouter.post("/signIn",userController.login);
userRouter.get("/",authMiddleweare,userController.getUsers);
userRouter.get("/:id",userNotExistsMiddleweare,userController.getUser);
userRouter.delete("/:id",userNotExistsMiddleweare,userController.delete_user);
userRouter.patch("/:id",userNotExistsMiddleweare,userController.update_user);

module.exports=userRouter;
