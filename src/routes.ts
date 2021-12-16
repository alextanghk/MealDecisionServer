import express from 'express';
import LocationController from './controllers/LocationController';
import RestaurantController from './controllers/RestaurantController';
import TagController from './controllers/TagController';
import database from './configs/database';
import dotenv from 'dotenv'
dotenv.config()

const routes = express.Router();

const middleWare = async (req:express.Request,res:express.Response,next: Function) => {
    // const connection = await database('','','','');
    // req.connection = null;
    next();
}

routes.get("/locations",middleWare, async (req,res)=>{
    const locationController = new LocationController(req.connection);
    const data = await locationController.GetLocations();
    res.json({
        data
    })
});

routes.get("/locations/:id",middleWare, async (req,res)=>{
    if (!Number.isInteger(Number(req.params.id))) {
        res.status(500).json({})
        return
    }
    const id = Number(req.params.id);
    const locationController = new LocationController(req.connection);

    const data = await locationController.GetLocationById(id);
    res.json({
        data
    })
});

routes.get("/restaurants",middleWare,async (req,res)=>{
    const restaurantController = new RestaurantController(req.connection);
    const data = await restaurantController.GetRestaurants()
    res.json({
        data
    })
})

routes.get("/restaurants/:id",middleWare,async (req,res)=>{
    if (!Number.isInteger(Number(req.params.id))) {
        res.status(500).json({})
        return
    }
    const id = Number(req.params.id);
    const restaurantController = new RestaurantController(req.connection);
    const data = await restaurantController.GetRestaurantById(id);
    res.json({
        data
    })
});

routes.post("/restaurants/draw",middleWare,async (req,res)=>{
    const restaurantController = new RestaurantController(req.connection);
    const data = await restaurantController.PostDrawRestaurants()
    res.json({
        data
    })
})

routes.get("/tags",middleWare,async (req,res)=>{
    const tagController = new TagController(req.connection);
    const data = await tagController.GetTags()
    res.json({
        data
    })
})

routes.get("/tags/:id",middleWare,async (req,res)=>{
    if (!Number.isInteger(Number(req.params.id))) {
        res.status(500).json({})
        return
    }
    const id = Number(req.params.id);
    const tagController = new TagController(req.connection);
    const data = await tagController.GetTagById(id);
    res.json({
        data
    })
});

export default routes;