import * as express from 'express';
import * as RestaurantRepository from '../repositories/RestaurantRepository';

export default class RestaurantController {

    private database = null;
    constructor(db:any) {
        this.database = db;
    }
    public async GetRestaurants(locationId?: number, filter?:string, skip?:number, take?:number) {
        return []

    }
    public async GetRestaurantById(id: number) {
        return []

    }

    public async PostDrawRestaurants(request: object) {
        return []

    }
}