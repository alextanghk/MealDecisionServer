import app from './server';
import dotenv from 'dotenv'

dotenv.config()

const port = process.env.PORT !== undefined && Number.isInteger(Number(process.env.PORT)) ? Number(process.env.PORT) : 3000;

app.listen(port, () => {
    console.log('');
});