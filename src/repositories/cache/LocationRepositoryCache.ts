import * as repo from '../LocationRepository';
import * as helpers from '../../helpers/helpers';
import CacheLoader from '../../caches/CacheLoader';

export const CountRestaurants = async(cacheType:string, connection:any, locationId: number) => {
    
    let result = null
    const cacheKey = 'COUNT_LOC_RESTAURANTS_'+helpers.CacheKey({locationId:locationId})

    if (cacheType != '') {
        const cache = new CacheLoader(cacheType)
        const hasCache = cache.has(cacheKey)
        if (hasCache) {
            result = cache.get(cacheKey)
        } else {
            result = repo.CountRestaurants(connection, locationId)
            cache.set(cacheKey, result)
        }
    } else {
        result = repo.CountRestaurants(connection, locationId)
    }
    return result;
}

export const GetLocations = async (cacheType:string, connection:any, params: { filter: string, skip: number, take: number }) => {
    let result = null
    const cacheKey = 'GET_LOCATIONS_'+helpers.CacheKey(params)

    if (cacheType != '') {
        const cache = new CacheLoader(cacheType)
        const hasCache = cache.has(cacheKey)
        if (hasCache) {
            result = cache.get(cacheKey)
        } else {
            result = repo.GetLocations(connection, params)
            cache.set(cacheKey, result)
        }
    } else {
        result = repo.GetLocations(connection, params)
    }
    return result;
}

export const GetLocationById = async (cacheType:string, connection:any, locationId: number) => {
    let result = null
    const cacheKey = 'GET_LOCATION_BY_ID_'+helpers.CacheKey({locationId:locationId})

    if (cacheType != '') {
        const cache = new CacheLoader(cacheType)
        const hasCache = cache.has(cacheKey)
        if (hasCache) {
            result = cache.get(cacheKey)
        } else {
            result = repo.GetLocationById(connection, locationId)
            cache.set(cacheKey, result)
        }
    } else {
        result = repo.GetLocationById(connection, locationId)
    }
    return result;
}