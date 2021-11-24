import request from 'supertest';
import app from '../server';

describe('Server alive testing',()=>{
    it('Server is running',async ()=>{
        const res = await request(app).get('/').send();
        expect(res.statusCode).toEqual(200);
    })
})