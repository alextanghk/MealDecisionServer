import * as express from 'express'
import database from './configs/database';
const middleware = async (req:express.Request,res:express.Response,next: Function) => {
    const connection = await database('','','','');
    req.connection = null;
    next();
}

export default middleware