const { moviesController } = require("../controllers")
const Router = require("express").Router;
const moviesRouter = Router();


moviesRouter.post("/",moviesController.addMovie);

module.exports=moviesRouter;