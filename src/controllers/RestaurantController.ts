import * as express from 'express';
import * as RestaurantRepository from '../repositories/RestaurantRepository';
import { DrawRequest } from '../types/Restaurants';

export default class RestaurantController {

    private database = null;
    constructor(db:any) {
        this.database = db;
    }
    public async GetRestaurants(filter?:string, take?:number, skip?:number) {
        const data = await RestaurantRepository.GetRestaurants(this.database, filter,take,skip);
        return data;
    }
    public async GetRestaurantById(id: number) {
        const data = await RestaurantRepository.GetRestaurantById(this.database, id);
        return data;
    }

    public async PostDrawRestaurants(request?: DrawRequest) {
        const data = await RestaurantRepository.DrawRestaurants(this.database, request);
        return data;
    }
}