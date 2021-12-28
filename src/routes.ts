import express from 'express'
import * as LocationController from './controllers/LocationController'
import * as RestaurantController from './controllers/RestaurantController'
import * as TagController from './controllers/TagController'
import database from './configs/database'
import dotenv from 'dotenv'
import middleware from './middleware'
dotenv.config()

const routes = express.Router();

routes.get("/locations",middleware, LocationController.GetLocations);
routes.get("/locations/:id",middleware, LocationController.GetLocationById);
routes.get("/locations/:id/count",middleware, LocationController.CountRestaurants);

routes.get("/locations/:locationId/restaurants",middleware, RestaurantController.GetRestaurants);

routes.get("/restaurants",middleware,RestaurantController.GetRestaurants)
routes.get("/restaurants/:id",middleware,RestaurantController.GetRestaurantById);
routes.post("/restaurants/draw",middleware,RestaurantController.PostDrawRestaurants)

routes.get("/tags",middleware,TagController.GetTags)
routes.get("/tags/:id/count",middleware,TagController.CountRestaurants)
routes.get("/tags/:id",middleware,TagController.GetTagById);

export default routes;