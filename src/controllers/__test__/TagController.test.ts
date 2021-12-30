import * as express from 'express'
import * as repoCache from '../../repositories/cache/TagRepositoryCache'
import * as controller from '../TagController'

const MockResponse = () => {
    const res = {}
    res.status = jest.fn().mockReturnValue(res)
    res.json = jest.fn().mockReturnValue(res)
    return res
}

describe("Count Restaurants", () => {
    it.each(["1","2"])('Success - Count Restaurants by location id %s', async(id)=> {
        const MockRequest = {
            database: null,
            params: {
                id: id
            }
        }
        const spy = jest.spyOn(repoCache,"CountRestaurants").mockReturnValue("")
        const res = MockResponse();
        const result = await controller.CountRestaurants(MockRequest, res)
        expect(spy).toBeCalledTimes(1)
        expect(spy).toBeCalledWith(process.env.CACHE_TYPE,MockRequest.database, parseInt(id))
        expect(res.json).toBeCalledTimes(1)
    })

    it.each([undefined, null])('Fail - Count Restaurants by location id %s', async(id)=> {
        const MockRequest = {
            database: null,
            params: {
                id: id
            }
        }
        const spy = jest.spyOn(repoCache,"CountRestaurants").mockReturnValue("")
        const res = MockResponse();
        const result = await controller.CountRestaurants(MockRequest, res)
        expect(spy).toBeCalledTimes(0)
        expect(res.status).toBeCalledTimes(1)
        expect(res.status).toBeCalledWith(400)
        expect(res.json).toBeCalledTimes(1)
    })
})

describe("Get Tags", () => {
    it.each([
        { filter: "", skip: 0, take: 10},
        { filter: "name", skip: 10, take: 20},
        { filter: "name", skip: 10},
        { filter: "name"},
        { },
        null,
    ])('Success - Get Tags %o', async(query)=> {
        const MockRequest = {
            database: null,
            query: query
        }
        const param = query === null || query === undefined ? null : {
            filter: query.filter || "",
            skip: query.skip || 0,
            take: query.take || parseInt(process.env.DEFAULT_ROWS_NUM?.toString())
        }
        const spy = jest.spyOn(repoCache,"GetTags").mockReturnValue("")
        const res = MockResponse();
        const result = await controller.GetTags(MockRequest, res)
        expect(spy).toBeCalledTimes(1)
        expect(spy).toBeCalledWith(process.env.CACHE_TYPE,MockRequest.database, param)
        expect(res.json).toBeCalledTimes(1)
    })
    it.each([
        { filter: "", skip: 0, take: 0},
        { filter: "", skip: -10, take: 0},
        { filter: "", skip: 0, take: -10},
    ])('Fail - Get Tags %o', async(query)=> {
        const MockRequest = {
            database: null,
            query: query
        }
        const param = query === null || query === undefined ? null : {
            filter: query.filter || "",
            skip: query.skip || 0,
            take: query.take || parseInt(process.env.DEFAULT_ROWS_NUM?.toString())
        }
        const spy = jest.spyOn(repoCache,"GetTags").mockReturnValue("")
        const res = MockResponse();
        const result = await controller.GetTags(MockRequest, res)
        expect(spy).toBeCalledTimes(0)
        expect(res.status).toBeCalledTimes(1)
        expect(res.status).toBeCalledWith(400)
        expect(res.json).toBeCalledTimes(1)
    })
})

describe("Get Tag by id", () => {
    it.each(["1","2"])('Success - Get Tag by id %s', async(id)=> {
        const MockRequest = {
            database: null,
            params: {
                id: id
            }
        }
        const spy = jest.spyOn(repoCache,"GetTagById").mockReturnValue("")
        const res = MockResponse();
        const result = await controller.GetTagById(MockRequest, res)
        expect(spy).toBeCalledTimes(1)
        expect(spy).toBeCalledWith(process.env.CACHE_TYPE,MockRequest.database, parseInt(id))
        expect(res.json).toBeCalledTimes(1)
    })

    it.each([undefined, null])('Fail - Get Tag by id %s', async(id)=> {
        const MockRequest = {
            database: null,
            params: {
                id: id
            }
        }
        const spy = jest.spyOn(repoCache,"GetTagById").mockReturnValue("")
        const res = MockResponse();
        const result = await controller.GetTagById(MockRequest, res)
        expect(spy).toBeCalledTimes(0)
        expect(res.status).toBeCalledTimes(1)
        expect(res.status).toBeCalledWith(400)
        expect(res.json).toBeCalledTimes(1)
    })
})