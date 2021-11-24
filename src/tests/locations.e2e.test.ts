import request from 'supertest';
import app from '../server';
import LocationController from '../controllers/LocationController';

describe('Locations API test',()=>{
    it('Get Locations',async ()=>{
        const res = await request(app).get('/api/locations').send();
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('data');
    })

    it('Get Location by id with correct id type',async ()=>{
        const res = await request(app).get('/api/locations/1').send();
        expect(res.statusCode).toEqual(200);
    })
    it('Get Location by id with incorrect id type',async ()=>{
        const res = await request(app).get('/api/locations/A').send();
        expect(res.statusCode).toEqual(500);
    })
})

