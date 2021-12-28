import * as express from 'express';
import * as repo from '../repositories/Cache/RestaurantRepositoryCache'
import dotenv from 'dotenv'

dotenv.config()

export const GetRestaurants = async(req:express.Request,res:express.Response) => {
    const { connection, query } = req;
    const { locationId } = query === null || query === undefined ? {} : query;
    const param = query === null || query === undefined ? null : {
        filter: query.filter || "",
        skip: query.skip == undefined ? 0 : query.skip,
        take: query.take === undefined ? process.env.DEFAULT_ROWS_NUM : query.take
    }
    if (param?.skip < 0 || param?.take <= 0) {
        return res.status(400).json({ status: 400, data: null, error: { message: "INVALID"}})
    }
    const id = locationId == null || locationId === undefined ? locationId : parseInt(locationId.toString())
    const data = await repo.GetRestaurants(process.env.CACHE_TYPE, connection, id, param)
    return res.json({ status: 200, data: data})
}
export const GetRestaurantById = async(req:express.Request,res:express.Response) => {
    const  { connection, query: { id } } = req;
    if(id !== undefined && id !== null) {
        const locationId = parseInt(id.toString())
        const data = await repo.GetRestaurantById(process.env.CACHE_TYPE, connection, locationId)
        return res.json({ status: 200, data: data})
    }
    return res.status(400).json({ status: 400, data: null, error: { message: "ID_INVALID" }})
}

export const PostDrawRestaurants = async(req:express.Request,res:express.Response) => {
    const  { connection, body } = req;
    const data = await repo.DrawRestaurants(process.env.CACHE_TYPE, connection, body)
    return res.json({ status: 200, data: data})
}