export const baseSQL = "SELECT `id`, `zh_name`, `en_name` FROM `tags` WHERE `visible` = 1"

export const CountRestaurants = async(connection:any, tagId: number) => {
    let sql = "SELECT COUNT(1) as 'total' FROM `restaurant_tags` WHERE `tag_id` = ?;", data = [tagId]
    const [rows, fields] = await connection.execute(sql, data);

    return rows.length > 0 ? rows[0].total : 0
}

export const GetTags = async (connection:any, params: { filter: string, skip: number, take: number }) => {
    const sql = baseSQL+" AND (`zh_name` LIKE '%?%' OR `en_name` LIKE '%?%') LIMIT ?, ?;";
    const data = [params.filter, params.filter, params.skip, params.take]
    const [rows, fields] = await connection.execute(sql, data);
    return rows;
}
export const GetTagById = async (connection:any, id:number) => {
    const sql = baseSQL+" AND `id` = ?;";
    const [rows, fields] = await connection.execute(sql, [id]);

    return rows.length > 0 ? rows[0] : null;
}