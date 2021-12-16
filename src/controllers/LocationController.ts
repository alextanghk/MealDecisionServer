import * as express from 'express';
import * as LocationRepository from '../repositories/LocationRepository';

export default class LocationController {

    private connection = null;

    constructor(conn:any) {
        this.connection = conn;
    }

    public async GetLocations(filter?:string, skip?:number, take?:number) {
        return []

    }

    public async GetLocationById(id: number) {
        return []

    }
}