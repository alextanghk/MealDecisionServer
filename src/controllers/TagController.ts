import * as express from 'express'
import * as repo from '../repositories/Cache/TagRepositoryCache'
import dotenv from 'dotenv'

dotenv.config()

export const CountRestaurants = async(req:express.Request,res:express.Response) => {
    const  { connection, query: { id } } = req;
    if(id !== undefined && id !== null) {
        const locationId = parseInt(id.toString())
        const data = await repo.CountRestaurants(process.env.CACHE_TYPE, connection, locationId)
        return res.json({ status: 200, data: data})
    }
    return res.status(400).json({ status: 400, data: null, error: { message: "ID_INVALID" }})
}
export const GetTags = async(req:express.Request,res:express.Response) => {
    const { connection, query } = req;
    const param = query === null || query === undefined ? null : {
        filter: query.filter || "",
        skip: query.skip == undefined ? 0 : query.skip,
        take: query.take === undefined ? process.env.DEFAULT_ROWS_NUM : query.take
    }
    if (param?.skip < 0 || param?.take <= 0) {
        return res.status(400).json({ status: 400, data: null, error: { message: "INVALID"}})
    }
    const data = await repo.GetTags(process.env.CACHE_TYPE, connection, param)
    return res.json({ status: 200, data: data})
    
}

export const GetTagById = async(req:express.Request,res:express.Response) => {
    const  { connection, query: { id } } = req;
    if(id !== undefined && id !== null) {
        const locationId = parseInt(id.toString())
        const data = await repo.GetTagById(process.env.CACHE_TYPE, connection, locationId)
        return res.json({ status: 200, data: data})
    }
    return res.status(400).json({ status: 400, data: null, error: { message: "ID_INVALID" }})
}