import express from 'express';
import routes from './routes';
import * as bodyParser from "body-parser";
import dotenv from 'dotenv'

dotenv.config()

const app = express();
app.use(bodyParser.json());
app.use('/api',routes);
app.get('/',(req,res)=>{
    res.send('thanks');
})

export default app;