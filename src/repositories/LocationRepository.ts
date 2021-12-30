
import Mysql from 'mysql2/promise'

export const baseSQL = "SELECT `id`,`zh_name`,`en_name` FROM `locations` WHERE `visible` = 1" 

interface CountData extends Mysql.RowDataPacket {
    total: number
}

interface LocationData extends Mysql.RowDataPacket {
    id: number,
    zh_name: string,
    en_name: string
}

export const CountRestaurants = async(connection:Mysql.Pool, locationId: number) => {
    let sql = "SELECT COUNT(1) as 'total' FROM `restaurants` WHERE `visible` = 1 AND `location_id` = ?;", data = [locationId]
    const [rows] = await connection.execute<Array<CountData>>(sql, data);

    if (rows === null || rows === undefined) return null;
    return rows.length > 0 ? rows[0] ? rows[0].total : null : null;
}

export const GetLocations = async (connection:Mysql.Pool, params?: { filter: string, skip: number, take: number } | null) => {
    const sql = baseSQL + (params === null ? ";":" AND (`zh_name` LIKE ? OR `en_name` LIKE ?) LIMIT ?, ?;")
    const data = params === null ? [] : [`%${params?.filter}%`, `%${params?.filter}%`, params?.skip, params?.take]
    const [rows] = await connection.execute<Array<LocationData>>(sql, data)
    return rows;
}

export const GetLocationById = async (connection:Mysql.Pool, id: number) => {
    const sql = baseSQL+" AND `id` = ?;"
    const [rows] = await connection.execute<Array<LocationData>>(sql,[id]);
    if (rows === null || rows === undefined) return null;
    return rows.length > 0 ? rows[0] ? rows[0] : null : null;
}