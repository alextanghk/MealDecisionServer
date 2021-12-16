import CacheLoader from "../CacheLoader";
import NodeCache from 'node-cache';
jest.mock('node-cache');


describe("Cache Loader", ()=>{
    
    describe("Local Cache", () =>{
        const mockGetCache = jest.fn()
        const mockSetCache = jest.fn()
        NodeCache.prototype.get = mockGetCache
        NodeCache.prototype.set = mockSetCache
        const cache = new CacheLoader('local');
        const cacheKey = "testing";
        beforeEach(()=>{
            NodeCache.mockClear()
            mockGetCache.mockReset()
            mockSetCache.mockReset()
        })

        it("Check Constructor", () => {
            expect(cache.cacheType).toEqual("LOCAL")
        })

        it("Unsupport Cache Type", () => {
            expect(() => { new CacheLoader('testing') }).toThrow('Cache Type Not Supported')
        })

        it('Check Has Cache by Key',() => {
            const result = cache.has(cacheKey)
            expect(mockGetCache).toBeCalledTimes(1)
            expect(mockGetCache).toBeCalledWith(cacheKey)
            expect(typeof result).toEqual("boolean")
        })

        it('Get Cache by Key',() => {
            mockGetCache.mockReturnValue("testing")
            const result = cache.get(cacheKey)
            expect(mockGetCache).toBeCalledTimes(1)
            expect(mockGetCache).toBeCalledWith(cacheKey)
            expect(result).not.toBeUndefined()
        })

        it('Set Cache by Key',() => {
            const body = { test: "test"}
            const result = cache.set(cacheKey,body)
            expect(mockSetCache).toBeCalledTimes(1)
            expect(mockSetCache).toBeCalledWith(cacheKey, body)
        })
    })
})