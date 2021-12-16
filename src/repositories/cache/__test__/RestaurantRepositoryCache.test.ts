import * as repoCache from '../RestaurantRepositoryCache';
import * as repo from '../../RestaurantRepository';
import * as helpers from '../../../helpers/helpers';
import MockCacheLoader from '../../../caches/CacheLoader';

jest.mock('../../../caches/CacheLoader')
const mockHasCache = jest.fn()
const mockGetCache = jest.fn()
const mockSetCache = jest.fn()

MockCacheLoader.prototype.has = mockHasCache
MockCacheLoader.prototype.get = mockGetCache
MockCacheLoader.prototype.set = mockSetCache

const mockHelper = jest.spyOn(helpers,'CacheKey')

const MockCacheKey = "testing";

describe("Restaurant Repository Cache Test", () => {
    beforeEach(()=>{
        MockCacheLoader.mockClear()
        mockHasCache.mockReset()
        mockGetCache.mockReset()
        mockSetCache.mockReset()
        mockHelper.mockReset()
        mockHelper.mockReturnValue(MockCacheKey)
    })

    describe("Get Restaurants", () =>{
        
        const cacheKey = 'GET_RESTAURANTS_'+MockCacheKey
        const spy = jest.spyOn(repo,"GetRestaurants")

        beforeEach(()=>{
            spy.mockReset()
        })

        it("Without cache", async ()=>{
            spy.mockReturnValue("testing")
            const result = await repoCache.GetRestaurants('',null, 1, null)
            expect(MockCacheLoader).toHaveBeenCalledTimes(0)
            expect(spy).toBeCalledTimes(1)
            expect(spy).toBeCalledWith(null, 1, null)
            expect(result).toEqual("testing")
        })

        describe("Local Cache Type", () => {
            it("Cache Exist", async() =>{
                mockGetCache.mockReturnValue("testing")
                mockHasCache.mockReturnValue(true)
                const result = await repoCache.GetRestaurants("local",null, 1, null)
                expect(mockHelper).toBeCalledTimes(1)
                expect(mockHelper).toBeCalledWith({locationId: 1, param: null})
                expect(MockCacheLoader).toHaveBeenCalledTimes(1)
                expect(mockHasCache).toBeCalledTimes(1)
                expect(mockHasCache).toBeCalledWith(cacheKey)
                expect(mockGetCache).toBeCalledTimes(1)
                expect(mockGetCache).toBeCalledWith(cacheKey)
                expect(spy).toBeCalledTimes(0)
            })

            it("Cache Not Exist", async()=> {
                const mockResult = "testing"

                mockHasCache.mockReturnValue(false)
                spy.mockReturnValue(mockResult)

                const result = await repoCache.GetRestaurants("local",null, 1, null)
                expect(mockHelper).toBeCalledTimes(1)
                expect(mockHelper).toBeCalledWith({locationId: 1, param: null})
                expect(MockCacheLoader).toHaveBeenCalledTimes(1)
                expect(mockHasCache).toBeCalledTimes(1)
                expect(mockHasCache).toBeCalledWith(cacheKey)
                expect(mockGetCache).toBeCalledTimes(0)
                expect(spy).toBeCalledTimes(1)
                expect(spy).toBeCalledWith(null, 1, null)
                expect(mockSetCache).toBeCalledTimes(1)
                expect(mockSetCache).toBeCalledWith(cacheKey, mockResult)
            })
        })
    })

    describe("Get Restaurant by id", () =>{
        
        const cacheKey = 'GET_RESTAURANT_BY_ID_'+MockCacheKey

        const spy = jest.spyOn(repo,"GetRestaurantById")

        beforeEach(()=>{
            spy.mockReset()
        })

        it("Without cache", async ()=>{
            spy.mockReturnValue("testing")
            const result = await repoCache.GetRestaurantById('',null, 1)
            expect(MockCacheLoader).toHaveBeenCalledTimes(0)
            expect(spy).toBeCalledTimes(1)
            expect(spy).toBeCalledWith(null, 1)
            expect(result).toEqual("testing")
        })

        describe("Local Cache Type", () => {
            it("Cache Exist", async() =>{
                mockGetCache.mockReturnValue("testing")
                mockHasCache.mockReturnValue(true)
                const result = await repoCache.GetRestaurantById("local",null, 1)
                expect(mockHelper).toBeCalledTimes(1)
                expect(mockHelper).toBeCalledWith({restaurantId: 1})
                expect(MockCacheLoader).toHaveBeenCalledTimes(1)
                expect(mockHasCache).toBeCalledTimes(1)
                expect(mockHasCache).toBeCalledWith(cacheKey)
                expect(mockGetCache).toBeCalledTimes(1)
                expect(mockGetCache).toBeCalledWith(cacheKey)
                expect(spy).toBeCalledTimes(0)
            })

            it("Cache Not Exist", async()=> {
                const mockResult = "testing"

                mockHasCache.mockReturnValue(false)
                spy.mockReturnValue(mockResult)

                const result = await repoCache.GetRestaurantById("local",null, 1)
                expect(mockHelper).toBeCalledTimes(1)
                expect(mockHelper).toBeCalledWith({restaurantId: 1})
                expect(MockCacheLoader).toHaveBeenCalledTimes(1)
                expect(mockHasCache).toBeCalledTimes(1)
                expect(mockHasCache).toBeCalledWith(cacheKey)
                expect(mockGetCache).toBeCalledTimes(0)
                expect(spy).toBeCalledTimes(1)
                expect(spy).toBeCalledWith(null, 1)
                expect(mockSetCache).toBeCalledTimes(1)
                expect(mockSetCache).toBeCalledWith(cacheKey, mockResult)
            })
        })
    })

    describe("Get Restaurant Links by ids", () =>{
        
        const cacheKey = 'GET_RESTAURANT_LINKS_BY_IDS_'+MockCacheKey

        const spy = jest.spyOn(repo,"GetRestaurantLinks")

        beforeEach(()=>{
            spy.mockReset()
        })

        it("Without cache", async ()=>{
            spy.mockReturnValue("testing")
            const result = await repoCache.GetRestaurantLinks('',null, [1])
            expect(MockCacheLoader).toHaveBeenCalledTimes(0)
            expect(spy).toBeCalledTimes(1)
            expect(spy).toBeCalledWith(null, [1])
            expect(result).toEqual("testing")
        })

        describe("Local Cache Type", () => {
            it("Cache Exist", async() =>{
                mockGetCache.mockReturnValue("testing")
                mockHasCache.mockReturnValue(true)
                const result = await repoCache.GetRestaurantLinks("local",null, [1])
                expect(mockHelper).toBeCalledTimes(1)
                expect(mockHelper).toBeCalledWith({restaurantIds: [1]})
                expect(MockCacheLoader).toHaveBeenCalledTimes(1)
                expect(mockHasCache).toBeCalledTimes(1)
                expect(mockHasCache).toBeCalledWith(cacheKey)
                expect(mockGetCache).toBeCalledTimes(1)
                expect(mockGetCache).toBeCalledWith(cacheKey)
                expect(spy).toBeCalledTimes(0)
            })

            it("Cache Not Exist", async()=> {
                const mockResult = "testing"

                mockHasCache.mockReturnValue(false)
                spy.mockReturnValue(mockResult)

                const result = await repoCache.GetRestaurantLinks("local",null, [1])
                expect(mockHelper).toBeCalledTimes(1)
                expect(mockHelper).toBeCalledWith({restaurantIds: [1]})
                expect(MockCacheLoader).toHaveBeenCalledTimes(1)
                expect(mockHasCache).toBeCalledTimes(1)
                expect(mockHasCache).toBeCalledWith(cacheKey)
                expect(mockGetCache).toBeCalledTimes(0)
                expect(spy).toBeCalledTimes(1)
                expect(spy).toBeCalledWith(null, [1])
                expect(mockSetCache).toBeCalledTimes(1)
                expect(mockSetCache).toBeCalledWith(cacheKey, mockResult)
            })
        })
    })

    describe("Draw Restaurants", () =>{
        
        const cacheKey = 'DRAW_RESTAURANTS_'+MockCacheKey

        const spy = jest.spyOn(repo,"DrawRestaurants")

        const request = { locationId: 1, rangeIds: [1,2,3]}

        beforeEach(()=>{
            spy.mockReset()
        })

        it("Without cache", async ()=>{
            spy.mockReturnValue("testing")
            const result = await repoCache.DrawRestaurants('',null, request)
            expect(MockCacheLoader).toHaveBeenCalledTimes(0)
            expect(spy).toBeCalledTimes(1)
            expect(spy).toBeCalledWith(null, request)
            expect(result).toEqual("testing")
        })

        describe("Local Cache Type", () => {
            it("Cache Exist", async() =>{
                mockGetCache.mockReturnValue("testing")
                mockHasCache.mockReturnValue(true)
                const result = await repoCache.DrawRestaurants("local",null, request)
                expect(mockHelper).toBeCalledTimes(1)
                expect(mockHelper).toBeCalledWith(request)
                expect(MockCacheLoader).toHaveBeenCalledTimes(1)
                expect(mockHasCache).toBeCalledTimes(1)
                expect(mockHasCache).toBeCalledWith(cacheKey)
                expect(mockGetCache).toBeCalledTimes(1)
                expect(mockGetCache).toBeCalledWith(cacheKey)
                expect(spy).toBeCalledTimes(0)
            })

            it("Cache Not Exist", async()=> {
                const mockResult = "testing"

                mockHasCache.mockReturnValue(false)
                spy.mockReturnValue(mockResult)

                const result = await repoCache.DrawRestaurants("local",null, request)
                expect(mockHelper).toBeCalledTimes(1)
                expect(mockHelper).toBeCalledWith(request)
                expect(MockCacheLoader).toHaveBeenCalledTimes(1)
                expect(mockHasCache).toBeCalledTimes(1)
                expect(mockHasCache).toBeCalledWith(cacheKey)
                expect(mockGetCache).toBeCalledTimes(0)
                expect(spy).toBeCalledTimes(1)
                expect(spy).toBeCalledWith(null, request)
                expect(mockSetCache).toBeCalledTimes(1)
                expect(mockSetCache).toBeCalledWith(cacheKey, mockResult)
            })
        })
    })
})