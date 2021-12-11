import app from './server';
import dotenv from 'dotenv'

dotenv.config()

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Listening to port ?',port);
});