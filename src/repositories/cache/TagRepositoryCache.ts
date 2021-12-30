import Mysql from 'mysql2/promise'

import * as repo from '../TagRepository'
import * as helpers from '../../helpers/helpers'
import CacheLoader from '../../caches/CacheLoader'

export const CountRestaurants = async(cacheType:string, connection:Mysql.Pool, tagId: number) => {
    let result = null
    const cacheKey = 'COUNT_RESTAURANTS_BY_TAG_'+helpers.CacheKey({tagId:tagId})

    if (cacheType != '') {
        const cache = new CacheLoader(cacheType)
        const hasCache = cache.has(cacheKey)
        if (hasCache) {
            result = cache.get(cacheKey)
        } else {
            result = repo.CountRestaurants(connection, tagId)
            cache.set(cacheKey, result)
        }
    } else {
        result = repo.CountRestaurants(connection, tagId)
    }
    return result;
}

export const GetTags = async (cacheType:string, connection:Mysql.Pool, params?: { filter: string, skip: number, take: number } | null) => {
    let result = null
    const cacheKey = 'GET_TAGS_'+helpers.CacheKey(params)

    if (cacheType != '') {
        const cache = new CacheLoader(cacheType)
        const hasCache = cache.has(cacheKey)
        if (hasCache) {
            result = cache.get(cacheKey)
        } else {
            result = repo.GetTags(connection, params)
            cache.set(cacheKey, result)
        }
    } else {
        result = repo.GetTags(connection, params)
    }
    return result;
}
export const GetTagById = async (cacheType:string, connection:Mysql.Pool, tagId:number) => {
    let result = null
    const cacheKey = 'GET_TAG_BY_ID_'+helpers.CacheKey({tagId:tagId})

    if (cacheType != '') {
        const cache = new CacheLoader(cacheType)
        const hasCache = cache.has(cacheKey)
        if (hasCache) {
            result = cache.get(cacheKey)
        } else {
            result = repo.GetTagById(connection, tagId)
            cache.set(cacheKey, result)
        }
    } else {
        result = repo.GetTagById(connection, tagId)
    }
    return result;
}