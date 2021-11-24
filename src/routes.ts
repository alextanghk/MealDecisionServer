import express from 'express';
import LocationController from './controllers/LocationController';
import RestaurantController from './controllers/RestaurantController';
import TagController from './controllers/TagController';

const locationController = new LocationController();
const restaurantController = new RestaurantController();
const tagController = new TagController();

const routes = express.Router();

routes.get("/locations", async (req,res)=>{
    const data = await locationController.GetLocations();
    res.json({
        data
    })
});

routes.get("/locations/:id", async (req,res)=>{
    if (!Number.isInteger(Number(req.params.id))) {
        res.status(500).json({})
        return
    }
    const id = Number(req.params.id);
    const data = await locationController.GetLocationById(id);
    res.json({
        data
    })
});

routes.get("/restaurants",async (req,res)=>{
    const data = await restaurantController.GetRestaurants()
    res.json({
        data
    })
})

routes.get("/restaurants/:id",async (req,res)=>{
    if (!Number.isInteger(Number(req.params.id))) {
        res.status(500).json({})
        return
    }
    const id = Number(req.params.id);
    const data = await restaurantController.GetRestaurantById(id);
    res.json({
        data
    })
});

routes.post("/restaurants/draw",async (req,res)=>{
    const data = await restaurantController.PostDrawRestaurants()
    res.json({
        data
    })
})

routes.get("/tags",async (req,res)=>{
    const data = await tagController.GetTags()
    res.json({
        data
    })
})

routes.get("/tags/:id",async (req,res)=>{
    if (!Number.isInteger(Number(req.params.id))) {
        res.status(500).json({})
        return
    }
    const id = Number(req.params.id);
    const data = await tagController.GetTagById(id);
    res.json({
        data
    })
});

export default routes;