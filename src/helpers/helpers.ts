import * as crypto from "crypto";


export const CacheKey = (body?: object | null) => {
    return crypto.createHash('md5').update(JSON.stringify(body)).digest('hex')
}