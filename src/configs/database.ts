import mysql from 'mysql2/promise'
const database = async (host:string, username: string, password: string, db:string) => {
    const pool = await mysql.createPool({
        host: host,
        user: username,
        password: password,
        database: db,
    })
    return pool;
}

export default database;