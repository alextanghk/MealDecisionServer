import * as express from 'express';
import * as LocationRepository from '../repositories/LocationRepository';

export default class LocationController {

    private connection = null;

    constructor(conn:any) {
        this.connection = conn;
    }

    public async GetLocations(filter?:string, take?:number, skip?:number) {
        const data = await LocationRepository.GetLocations(this.connection, filter, take, skip);
        return data;
    }

    public async GetLocationById(id: number) {
        const data = await LocationRepository.GetLocationById(this.connection, id);
        return data;
    }
}