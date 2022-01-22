import Mysql from 'mysql2/promise'
import * as Knex from 'knex'
import * as express from "express"
declare global {
    namespace Express { 
        interface Request {
            database: Mysql.Pool,
            conn: Knex.Knex
        }
    }
}