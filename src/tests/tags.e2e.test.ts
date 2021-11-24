import request from 'supertest';
import app from '../server';

describe('Tages API test',()=>{
    it('Get Tages',async ()=>{
        const res = await request(app).get('/api/tags').send();
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('data');
    })

    it('Get tag by id with correct id type',async ()=>{
        const res = await request(app).get('/api/tags/1').send();
        expect(res.statusCode).toEqual(200);
    })
    it('Get tag by id with incorrect id type',async ()=>{
        const res = await request(app).get('/api/tags/A').send();
        expect(res.statusCode).toEqual(500);
    })
})

