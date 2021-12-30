import Mysql from 'mysql2/promise'

export const baseSQL = "SELECT r.`id`,r.`name`,r.`zh_address`, r.`en_address`, l.`zh_name` AS 'loc_zh_name', l.`en_name` AS 'loc_en_name', p.`content` AS 'price_range'"
            + " FROM `restaurants` r"
            + " LEFT JOIN `locations` l ON r.`location_id` = l.`id`"
            + " LEFT JOIN `price_ranges` p ON r.`range_id` = p.`id`"
            + " WHERE r.`visible` = 1";

interface RestaurantData extends Mysql.RowDataPacket {
    id: number,
    name: string,
    zh_address: string,
    en_address: string,
    loc_zh_name: string,
    loc_en_name: string,
    price_range: string
}
            
interface RestaurantLinkData extends Mysql.RowDataPacket {
    restaurant_id: number,
    link: string,
    type: string
}
export const GetRestaurants = async (connection:Mysql.Pool, locationId: number = 0, param?: { filter:string, skip:number, take:number } | null) => {
    let sql, data = [];
    sql = baseSQL
    if (locationId > 0) {
        sql += " AND r.`location_id` = ?"
        data.push(locationId)
    }
    if (param !== null) {
        sql += " AND r.`name` LIKE ? LIMIT ?, ?"
        data.push(`%${param?.filter}%`)
        data.push(param?.skip)
        data.push(param?.take)
    }
    sql += ";"

    const [rows, fields] = await connection.execute<Array<RestaurantData>>(sql, data)

    return rows;
}

export const GetRestaurantById = async (connection:Mysql.Pool, id: number) => {
    let sql = baseSQL + " AND r.`id` = ?;"
    const [rows] = await connection.execute<Array<RestaurantData>>(sql,[id]);
    if (rows === null || rows === undefined) return null;
    return rows.length > 0 ? rows[0] ? rows[0] : null : null;
}

export const GetRestaurantLinksById = async(connection:Mysql.Pool, id: number) => {
    if (id !== null) {
        let sql = "SELECT `restaurant_id`,`link`,`type` FROM `restaurant_links` WHERE `visible` = 1 AND `restaurant_id` = ?;"
        const [rows] = await connection.execute<Array<RestaurantLinkData>>(sql,[id]);
        return rows;
    }
    return []
}

export const DrawRestaurants = async(connection:Mysql.Pool, request?: { locationId?: number, rangeIds?:Array<number>, tagIds?:Array<number>, numOfRandom?:number }) => {
    let sql = baseSQL
    let data = []
    if (request != null) {
        if (
            request.locationId !== undefined 
            && request.locationId !== null 
            && request.locationId > 0
        ) {
            data.push(request.locationId)
            sql += " AND r.`location_id` = ?"
        }

        if (
                request.rangeIds !== undefined 
                && request.rangeIds != null 
                && request.rangeIds.length > 0
            ){
            data.push(request.rangeIds)
            sql += " AND r.`range_id` IN (?)"
        }

        if (
            request.tagIds !== undefined 
            && request.tagIds != null 
            && request.tagIds.length > 0
        ){
            data.push(request.tagIds)
            sql += " AND r.`id` IN (SELECT `restaurant_id` FROM `restaurant_tags` WHERE `tag_id` IN (?))"
        }
    }
    
    sql += " ORDER BY RAND()"
    if (request != null && request.numOfRandom !== undefined && request.numOfRandom !== null && request.numOfRandom > 0) {
        sql += " LIMIT ?"
        data.push(request.numOfRandom)
    }
    sql += ";"

    const [rows] = await connection.execute<Array<RestaurantData>>(sql, data)
    return rows
}