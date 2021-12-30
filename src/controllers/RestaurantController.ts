import * as express from 'express';
import * as repo from '../repositories/cache/RestaurantRepositoryCache'
import dotenv from 'dotenv'

dotenv.config()
const cacheType = process.env.CACHE_TYPE === undefined ? "" : process.env.CACHE_TYPE?.toString()

export const GetRestaurants = async(req:express.Request,res:express.Response) => {
    const { query, params = {} } = req;
    const connection = req.database;
    const { locationId = 0 } = params === null ? {} : params;
    const DEFAULT_ROWS_NUM = process.env.DEFAULT_ROWS_NUM === null || process.env.DEFAULT_ROWS_NUM === undefined ? 10 : parseInt(process.env.DEFAULT_ROWS_NUM.toString());
    const param = query === null || query === undefined ? null : {
        filter: query.filter === undefined || query.filter === null ? "" : query.filter.toString(),
        skip: query.skip === undefined || query.skip === null ? 0 : parseInt(query.skip.toString()),
        take: query.take === undefined || query.take === null ? DEFAULT_ROWS_NUM :  parseInt(query.take.toString())
    }
    if (param !== null && param !== undefined && (param?.skip < 0 || param?.take <= 0)) {
        return res.status(400).json({ status: 400, data: null, error: { message: "INVALID"}})
    }
    const id = locationId == null || locationId === undefined ? locationId : parseInt(locationId.toString())
    const data = await repo.GetRestaurants(cacheType, connection, id, param)
    return res.json({ status: 200, data: data})
}
export const GetRestaurantById = async(req:express.Request,res:express.Response) => {
    const { params = {}} = req;
    const { id = null } = params === null ? {} : params;
    const connection = req.database;

    if(id !== undefined && id !== null) {
        const locationId = parseInt(id.toString())
        const data = await repo.GetRestaurantById(cacheType, connection, locationId)
        return res.json({ status: 200, data: data})
    }
    return res.status(400).json({ status: 400, data: null, error: { message: "ID_INVALID" }})
}

export const PostDrawRestaurants = async(req:express.Request,res:express.Response) => {
    const  { body } = req;
    const connection = req.database;

    const data = await repo.DrawRestaurants(cacheType, connection, body)
    return res.json({ status: 200, data: data})
}