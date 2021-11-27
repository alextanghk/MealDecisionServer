import request from 'supertest';
import app from '../server';
import RestaurantController from '../controllers/RestaurantController';
import MockMysql from 'mysql2/promise';
jest.mock('mysql2/promise');

describe('Restaurants API test',()=>{
    it('Get Restaurants',async ()=>{
        const res = await request(app).get('/api/restaurants').send();
        expect(res.statusCode).toEqual(200);
    })

    it('Get Restaurant by id with correct id type',async ()=>{
        const res = await request(app).get('/api/restaurants/1').send();
        expect(res.statusCode).toEqual(200);
    })

    it('Get Restaurant by id with incorrect id type',async ()=>{
        const res = await request(app).get('/api/restaurants/A').send();
        expect(res.statusCode).toEqual(500);
    })

    it('Draw Random Restaurant', async () => {
        const res = await request(app).post('/api/restaurants/draw').send();
        expect(res.statusCode).toEqual(200);
    })
})