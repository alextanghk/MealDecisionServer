import * as express from 'express'
import * as repoCache from '../../repositories/cache/RestaurantRepositoryCache'
import * as controller from '../RestaurantController'

const MockResponse = () => {
    const res = {}
    res.status = jest.fn().mockReturnValue(res)
    res.json = jest.fn().mockReturnValue(res)
    return res
}

describe("Get Restaurants", () => {
    it.each([
        { locationId: 1, filter: "", skip: 0, take: 10},
        { locationId: "1", filter: "name", skip: 10, take: 20},
        { locationId: 1, filter: "name", skip: 10},
        { locationId: 1, filter: "name"},
        { },
        null,
    ])('Success - Get Restaurants %o', async(query)=> {
        const locationId = query === null || query.locationId === undefined ? 0 : parseInt(query.locationId.toString());

        const MockRequest = {
            database: null,
            params: {
                locationId: locationId
            },
            query: query
        }
        const param = query === null || query === undefined ? null : {
            filter: query.filter || "",
            skip: query.skip || 0,
            take: query.take || parseInt(process.env.DEFAULT_ROWS_NUM?.toString())
        }
        const spy = jest.spyOn(repoCache,"GetRestaurants").mockReturnValue("")
        const res = MockResponse();
        const result = await controller.GetRestaurants(MockRequest, res)
        expect(spy).toBeCalledTimes(1)
        expect(spy).toBeCalledWith(process.env.CACHE_TYPE, MockRequest.database, locationId, param)
        expect(res.json).toBeCalledTimes(1)
    })
    it.each([
        { filter: "", skip: 0, take: 0},
        { filter: "", skip: -10, take: 0},
        { filter: "", skip: 0, take: -10},
    ])('Fail - Get Restaurants %o', async(query)=> {
        const MockRequest = {
            database: null,
            params: null,
            query: query
        }
        const param = query === null || query === undefined ? null : {
            filter: query.filter || "",
            skip: query.skip || 0,
            take: query.take || parseInt(process.env.DEFAULT_ROWS_NUM?.toString())
        }
        const spy = jest.spyOn(repoCache,"GetRestaurants").mockReturnValue("")
        const res = MockResponse();
        const result = await controller.GetRestaurants(MockRequest, res)
        expect(spy).toBeCalledTimes(0)
        expect(res.status).toBeCalledTimes(1)
        expect(res.status).toBeCalledWith(400)
        expect(res.json).toBeCalledTimes(1)
    })
})

describe("Get Restaurant by id", () => {
    it.each(["1","2"])('Success - Get Restaurant by id %s', async(id)=> {
        const MockRequest = {
            database: null,
            params: {
                id: id
            }
        }
        const spy = jest.spyOn(repoCache,"GetRestaurantById").mockReturnValue("")
        const res = MockResponse();
        const result = await controller.GetRestaurantById(MockRequest, res)
        expect(spy).toBeCalledTimes(1)
        expect(spy).toBeCalledWith(process.env.CACHE_TYPE,MockRequest.database, parseInt(id))
        expect(res.json).toBeCalledTimes(1)
    })

    it.each([undefined, null])('Fail - Get Restaurant by id %s', async(id)=> {
        const MockRequest = {
            database: null,
            params: {
                id: id
            }
        }
        const spy = jest.spyOn(repoCache,"GetRestaurantById").mockReturnValue("")
        const res = MockResponse();
        const result = await controller.GetRestaurantById(MockRequest, res)
        expect(spy).toBeCalledTimes(0)
        expect(res.status).toBeCalledTimes(1)
        expect(res.status).toBeCalledWith(400)
        expect(res.json).toBeCalledTimes(1)
    })
})

describe("Draw Restaurants", () => {
    it.each([
        { locationId: 1, rangeIds: []},
        { locationId: 1, rangeIds: null},
        { locationId: 0, rangeIds: null},
        { locationId: 1, rangeIds: [1,2,3]},
        { },
        null,
        undefined
    ])('Success - Draw Restaurants %o', async(body)=> {
        const MockRequest = {
            database: null,
            body: body
        }
        
        const spy = jest.spyOn(repoCache,"DrawRestaurants").mockReturnValue("")
        const res = MockResponse();
        const result = await controller.PostDrawRestaurants(MockRequest, res)
        expect(spy).toBeCalledTimes(1)
        expect(spy).toBeCalledWith(process.env.CACHE_TYPE, MockRequest.database, body)
        expect(res.json).toBeCalledTimes(1)
    })
})