import Mysql from 'mysql2/promise'
import * as express from "express"
declare global {
    namespace Express { 
        interface Request {
            database: Mysql.Pool
        }
    }
}