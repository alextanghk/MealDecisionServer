import * as express from 'express'
import database from './configs/database'
import dotenv from 'dotenv'
import _ from 'lodash'
import Mysql from 'mysql2'

dotenv.config()
const middleware = async (req:express.Request,res:express.Response,next: Function) => {
    const DB_HOST = _.get(process.env,"DB_HOST", '')
    const DB_USERNAME = _.get(process.env,"DB_USERNAME", '')
    const DB_PASSWORD = _.get(process.env,"DB_PASSWORD", '')
    const DB_DATABASE = _.get(process.env,"DB_DATABASE", '')
    const connection = await database(
        DB_HOST,
        DB_USERNAME,
        DB_PASSWORD,
        DB_DATABASE);
    req.database = connection;
    next();
}

export default middleware