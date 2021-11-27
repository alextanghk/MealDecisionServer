import database from "./database";
import MockMysql from 'mysql2/promise';
jest.mock('mysql2/promise');

describe('Database connection test',()=>{
    it('database connection', async ()=>{
        const host = 'location';
        const user = 'root';
        const password = 'password';
        const db = 'tester';
        const conn =  await database(host,user,password,db);
        expect(MockMysql.createPool).toBeCalledWith({
            host: host,
            user: user,
            password: password,
            database: db
        })

        expect(MockMysql.createPool).toBeCalledTimes(1)
    })
})