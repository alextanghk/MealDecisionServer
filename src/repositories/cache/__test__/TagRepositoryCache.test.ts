import * as repoCache from '../TagRepositoryCache';
import * as repo from '../../TagRepository';
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

describe("Tag Repository Cache Test", () => {
    beforeEach(()=>{
        MockCacheLoader.mockClear()
        mockHasCache.mockReset()
        mockGetCache.mockReset()
        mockSetCache.mockReset()
        mockHelper.mockReset()
        mockHelper.mockReturnValue(MockCacheKey)
    })

    describe("Count Restaurants", () =>{
        
        const cacheKey = 'COUNT_RESTAURANTS_BY_TAG_'+MockCacheKey
        const spy = jest.spyOn(repo,"CountRestaurants")

        beforeEach(()=>{
            spy.mockReset()
        })

        it("Without cache", async ()=>{
            spy.mockReturnValue("testing")
            const result = await repoCache.CountRestaurants('',null, 1)
            expect(MockCacheLoader).toHaveBeenCalledTimes(0)
            expect(spy).toBeCalledTimes(1)
            expect(spy).toBeCalledWith(null, 1)
            expect(result).toEqual("testing")
        })

        describe("Local Cache Type", () => {
            it("Cache Exist", async() =>{
                mockGetCache.mockReturnValue("testing")
                mockHasCache.mockReturnValue(true)
                const result = await repoCache.CountRestaurants("local",null, 1)
                expect(mockHelper).toBeCalledTimes(1)
                expect(mockHelper).toBeCalledWith({tagId: 1})
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

                const result = await repoCache.CountRestaurants("local",null, 1)
                expect(mockHelper).toBeCalledTimes(1)
                expect(mockHelper).toBeCalledWith({tagId: 1})
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

    describe("Get Tags", () =>{
        
        const cacheKey = 'GET_TAGS_'+MockCacheKey

        const spy = jest.spyOn(repo,"GetTags")

        const params = [{ filter: "", skip: 0, take: 10},null]

        beforeEach(()=>{
            spy.mockReset()
        })
        it.each(params)("Without cache %o", async (param)=>{
            spy.mockReturnValue("testing")
            const result = await repoCache.GetTags('',null, param)
            expect(MockCacheLoader).toHaveBeenCalledTimes(0)
            expect(spy).toBeCalledTimes(1)
            expect(spy).toBeCalledWith(null, param)
            expect(result).toEqual("testing")
        })

        describe("Local Cache Type", () => {
            it.each(params)("Cache Exist %o", async(param) =>{
                mockGetCache.mockReturnValue("testing")
                mockHasCache.mockReturnValue(true)
                const result = await repoCache.GetTags("local",null, param)
                expect(mockHelper).toBeCalledTimes(1)
                expect(mockHelper).toBeCalledWith(param)
                expect(MockCacheLoader).toHaveBeenCalledTimes(1)
                expect(mockHasCache).toBeCalledTimes(1)
                expect(mockHasCache).toBeCalledWith(cacheKey)
                expect(mockGetCache).toBeCalledTimes(1)
                expect(mockGetCache).toBeCalledWith(cacheKey)
                expect(spy).toBeCalledTimes(0)
            })

            it.each(params)("Cache Not Exist %o", async(param)=> {
                const mockResult = "testing"

                mockHasCache.mockReturnValue(false)
                spy.mockReturnValue(mockResult)

                const result = await repoCache.GetTags("local",null, param)
                expect(mockHelper).toBeCalledTimes(1)
                expect(mockHelper).toBeCalledWith(param)
                expect(MockCacheLoader).toHaveBeenCalledTimes(1)
                expect(mockHasCache).toBeCalledTimes(1)
                expect(mockHasCache).toBeCalledWith(cacheKey)
                expect(mockGetCache).toBeCalledTimes(0)
                expect(spy).toBeCalledTimes(1)
                expect(spy).toBeCalledWith(null, param)
                expect(mockSetCache).toBeCalledTimes(1)
                expect(mockSetCache).toBeCalledWith(cacheKey, mockResult)
            })
        })
    })

    describe("Get Tag by id", () =>{
        
        const cacheKey = 'GET_TAG_BY_ID_'+MockCacheKey

        const spy = jest.spyOn(repo,"GetTagById")

        beforeEach(()=>{
            spy.mockReset()
        })

        it("Without cache", async ()=>{
            spy.mockReturnValue("testing")
            const result = await repoCache.GetTagById('',null, 1)
            expect(MockCacheLoader).toHaveBeenCalledTimes(0)
            expect(spy).toBeCalledTimes(1)
            expect(spy).toBeCalledWith(null, 1)
            expect(result).toEqual("testing")
        })

        describe("Local Cache Type", () => {
            it("Cache Exist", async() =>{
                mockGetCache.mockReturnValue("testing")
                mockHasCache.mockReturnValue(true)
                const result = await repoCache.GetTagById("local",null, 1)
                expect(mockHelper).toBeCalledTimes(1)
                expect(mockHelper).toBeCalledWith({tagId: 1})
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

                const result = await repoCache.GetTagById("local",null, 1)
                expect(mockHelper).toBeCalledTimes(1)
                expect(mockHelper).toBeCalledWith({tagId: 1})
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
})