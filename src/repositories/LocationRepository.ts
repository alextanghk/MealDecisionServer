
export const baseSQL = "SELECT `id`,`zh_name`,`en_name` FROM `locations` WHERE `visible` = 1" 

export const CountRestaurants = async(connection:any, locationId: number) => {
    let sql = "SELECT COUNT(1) as 'total' FROM `restaurants` WHERE `visible` = 1 AND `location_id` = ?;", data = [locationId]
    const [rows, fields] = await connection.execute(sql, data);

    return rows.length > 0 ? rows[0].total : 0
}

export const GetLocations = async (connection:any, params: { filter: string, skip: number, take: number }) => {
    const sql = baseSQL + " AND (`zh_name` LIKE '%?%' OR `en_name` LIKE '%?%') LIMIT ?, ?;";
    const [rows, fields] = await connection.execute(sql, [params.filter, params.filter, params.skip, params.take]);
    return rows;
}

export const GetLocationById = async (connection:any, id: number) => {
    const sql = baseSQL+" AND `id` = ?;"
    const [rows, fields] = await connection.execute(sql,[id]);
    return rows.length > 0 ? rows[0] : null;
}