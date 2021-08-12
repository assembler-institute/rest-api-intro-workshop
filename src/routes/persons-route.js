const { personsController } = require("../controllers")
const Router = require("express").Router;
const personRouter = Router();


personRouter.post("/actor",personsController.addActors);
personRouter.post("/worker",personsController.addWorkers);

module.exports=personRouter;