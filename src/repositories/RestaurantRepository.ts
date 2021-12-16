export const baseSQL = "SELECT r.`id`,r.`name`,r.`zh_address`, r.`en_address`, l.`zh_name` AS 'loc_zh_name', l.`en_name` AS 'loc_en_name', p.`content` AS 'price_range'"
            + " FROM `restaurants` r"
            + " LEFT JOIN `locations` l ON r.`location_id` = l.`id`"
            + " LEFT JOIN `price_ranges` p ON r.`range_id` = p.`id`"
            + " WHERE r.`visible` = 1";

export const GetRestaurants = async (connection:any, locationId: number = 0, param : { filter:string, skip:number, take:number }) => {
    let sql, data = [];
    sql = baseSQL
    if (locationId > 0) {
        sql += " AND r.`location_id` = ?";
        data.push(locationId)
    }
    sql += " AND r.`name` LIKE '%?%' LIMIT ?, ?;";
    data = data.concat([param.filter, param.skip, param.take])

    const [rows, fields] = await connection.execute(sql, data);

    return rows;
}

export const GetRestaurantById = async (connection:any, id: number) => {
    let sql = baseSQL + " AND r.`id` = ?;"
    const [rows, fields] = await connection.execute(sql,[id]);
    return rows.length > 0 ? rows[0] : null;
}

export const GetRestaurantLinks = async(connection:any, ids: Array<number>) => {
    if (ids !== null && ids.length > 0) {
        let sql = "SELECT `restaurant_id`,`link`,`type` FROM `restaurant_links` WHERE `visible` = 1 AND `restaurant_id` IN (?);"
        const [rows, fields] = await connection.execute(sql,[ids]);
        return rows;
    }
    return []
}

export const DrawRestaurants = async(connection:any, request?: { locationId?: number, rangeIds?:Array<number>, tagIds?:Array<number>, numOfRandom?:number }) => {
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

    const [rows,fields] = await connection.execute(sql, data)
    return rows
}