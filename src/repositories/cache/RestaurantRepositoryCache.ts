import * as repo from '../RestaurantRepository';
import * as helpers from '../../helpers/helpers';
import CacheLoader from '../../caches/CacheLoader';

export const GetRestaurants = async (cacheType:string, connection:any, locationId: number = 0, param : { filter:string, skip:number, take:number }) => {
    let result = null
    const cacheKey = 'GET_RESTAURANTS_'+helpers.CacheKey({locationId:locationId, param: param})

    if (cacheType != '') {
        const cache = new CacheLoader(cacheType)
        const hasCache = cache.has(cacheKey)
        if (hasCache) {
            result = cache.get(cacheKey)
        } else {
            result = repo.GetRestaurants(connection, locationId, param)
            cache.set(cacheKey, result)
        }
    } else {
        result = repo.GetRestaurants(connection, locationId, param)
    }
    return result;
}

export const GetRestaurantById = async (cacheType:string, connection:any, id: number) => {
    let result = null
    const cacheKey = 'GET_RESTAURANT_BY_ID_'+helpers.CacheKey({restaurantId:id})

    if (cacheType != '') {
        const cache = new CacheLoader(cacheType)
        const hasCache = cache.has(cacheKey)
        if (hasCache) {
            result = cache.get(cacheKey)
        } else {
            result = repo.GetRestaurantById(connection, id)
            const links = repo.GetRestaurantLinksById(connection, id)
            if (result != null) result = { ...result, links: links }
            cache.set(cacheKey, result)
        }
    } else {
        result = repo.GetRestaurantById(connection, id)
        const links = repo.GetRestaurantLinksById(connection, id)
        if (result != null) result = { ...result, links: links }
    }
    return result;
}

export const DrawRestaurants = async(cacheType:string, connection:any, request?: { locationId?: number, rangeIds?:Array<number>, tagIds?:Array<number>, numOfRandom?:number }) => {
    let result = null
    const cacheKey = 'DRAW_RESTAURANTS_'+helpers.CacheKey(request)

    if (cacheType != '') {
        const cache = new CacheLoader(cacheType)
        const hasCache = cache.has(cacheKey)
        if (hasCache) {
            result = cache.get(cacheKey)
        } else {
            result = repo.DrawRestaurants(connection, request)
            cache.set(cacheKey, result)
        }
    } else {
        result = repo.DrawRestaurants(connection, request)
    }
    return result;
}