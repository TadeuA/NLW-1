import express from "express";
import PointsController from "./controllers/PointsControllers";
import ItemsController from "./controllers/ItemsControllers";

const routes = express.Router();
const itemsController = new ItemsController();

const pointsController = new PointsController();

routes.get("/items", itemsController.index);

routes.post("/points", pointsController.create);
routes.get("/points/:id", pointsController.show);
routes.get("/points", pointsController.index);

export default routes;
