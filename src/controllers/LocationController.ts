import * as express from 'express';
import * as LocationRepository from '../repositories/LocationRepository';

export default class LocationController {

    private database = null;

    constructor(db:any) {
        this.database = db;
    }

    public async GetLocations(filter?:string, take?:number, skip?:number) {
        const data = await LocationRepository.GetLocations(this.database, filter, take, skip);
        return data;
    }

    public async GetLocationById(id: number) {
        const data = await LocationRepository.GetLocationById(this.database, id);
        return data;
    }
}