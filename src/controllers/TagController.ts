import * as express from 'express'
import * as repo from '../repositories/cache/TagRepositoryCache'
import dotenv from 'dotenv'

dotenv.config()
const cacheType = process.env.CACHE_TYPE === undefined ? "" : process.env.CACHE_TYPE?.toString()

export const CountRestaurants = async(req:express.Request,res:express.Response) => {
    const { params = {}} = req;
    const { id = null } = params === null ? {} : params;
    const connection = req.database;

    if(id !== undefined && id !== null) {
        const locationId = parseInt(id.toString())
        const data = await repo.CountRestaurants(cacheType, connection, locationId)
        return res.json({ status: 200, data: data})
    }
    return res.status(400).json({ status: 400, data: null, error: { message: "ID_INVALID" }})
}
export const GetTags = async(req:express.Request,res:express.Response) => {
    const { query } = req;
    const connection = req.database;

    const DEFAULT_ROWS_NUM = process.env.DEFAULT_ROWS_NUM === null || process.env.DEFAULT_ROWS_NUM === undefined ? 10 : parseInt(process.env.DEFAULT_ROWS_NUM.toString());
    const param = query === null || query === undefined ? null : {
        filter: query.filter === undefined || query.filter === null ? "" : query.filter.toString(),
        skip: query.skip === undefined || query.skip === null ? 0 : parseInt(query.skip.toString()),
        take: query.take === undefined || query.take === null ? DEFAULT_ROWS_NUM :  parseInt(query.take.toString())
    }
    if (param !== null && param !== undefined && (param?.skip < 0 || param?.take <= 0)) {
        return res.status(400).json({ status: 400, data: null, error: { message: "INVALID"}})
    }
    const data = await repo.GetTags(cacheType, connection, param)
    return res.json({ status: 200, data: data})
    
}

export const GetTagById = async(req:express.Request,res:express.Response) => {
    const { params = {}} = req;
    const { id = null } = params === null ? {} : params;
    const connection = req.database;

    if(id !== undefined && id !== null) {
        const locationId = parseInt(id.toString())
        const data = await repo.GetTagById(cacheType, connection, locationId)
        return res.json({ status: 200, data: data})
    }
    return res.status(400).json({ status: 400, data: null, error: { message: "ID_INVALID" }})
}