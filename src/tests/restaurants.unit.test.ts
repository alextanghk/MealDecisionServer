import RestaurantController from '../controllers/RestaurantController';
import * as RestaurantRepository from '../repositories/RestaurantRepository';
import { DrawRequest } from "../types/Restaurants";
import database from '../configs/database';

describe('Restaurants Repository Unit Test', () => {
    it('Get Restaurants without parameter', async () => {
        const data = await RestaurantRepository.GetRestaurants(database);
        expect(data).toBeInstanceOf(Array);
    })

    it('Get Restaurants with filter parameter only', async () => {
        const data = await RestaurantRepository.GetRestaurants(database,"");
        expect(data).toBeInstanceOf(Array);
    })

    it('Get Restaurants with filter and paging parameters', async () => {
        const data = await RestaurantRepository.GetRestaurants(database,"",10,0);
        expect(data).toBeInstanceOf(Array);
        expect(data.length <= 10).toBeTruthy()
    })

    it('Get Restaurant by id', async () => {
        const data = await RestaurantRepository.GetRestaurantById(database,1);
        expect(data).toBeInstanceOf(Object);
    })

    it('Draw Restaurants without query', async () => {
        const data = await RestaurantRepository.DrawRestaurants(database);
        expect(data).toBeInstanceOf(Array);
    })
    it('Draw Restaurants with query', async () => {
        const drawRequest = {
            locationId: 1, priceFrom: 0, priceTo: 0
        };
        const data = await RestaurantRepository.DrawRestaurants(database,drawRequest);
        expect(data).toBeInstanceOf(Array);
    })
})

describe('Restaurants Container Unit Test', () => {
    it('Get Restaurants', async()=>{
        const spy = jest
        .spyOn(RestaurantRepository, "GetRestaurants")
        .mockResolvedValueOnce([]);

        const controller = new RestaurantController(database);
        const data = await controller.GetRestaurants();
        expect(data).toBeInstanceOf(Array);
        expect(spy).toBeCalledTimes(1);
    })

    it('Get Restaurants with parameters', async()=>{
        const spy = jest
        .spyOn(RestaurantRepository, "GetRestaurants")
        .mockResolvedValueOnce([]);

        const controller = new RestaurantController(database);
        const data = await controller.GetRestaurants("",10,0);
        expect(data).toBeInstanceOf(Array);
        expect(data.length <= 10).toBeTruthy()
        expect(spy).toBeCalledWith(database,"",10,0)
        expect(spy).toBeCalledTimes(1);
    })

    it('Get Restaurants with parameters given parameters', async()=>{
        const spy = jest
        .spyOn(RestaurantRepository, "GetRestaurants")
        .mockResolvedValueOnce([]);

        const params = [
            { filter: "", skip: 0, take: 10 },
            { filter: "ABC", skip: 10, take: 20 }
        ]

        const controller = new RestaurantController(database);
        let data;
        for(const param of params) {
            spy.mockReset();
            data = await controller.GetRestaurants(param.filter,param.take,param.skip);
            expect(spy).toBeCalledWith(database,param.filter,param.take, param.skip)
        }
    })

    it('Get Restaurants By Id',async() => {
        const spy = jest
        .spyOn(RestaurantRepository, "GetRestaurantById")
        .mockResolvedValueOnce([]);

        const controller = new RestaurantController(database);
        const data = await controller.GetRestaurantById(1);
        expect(data).toBeInstanceOf(Object);
        expect(spy).toBeCalledWith(database,1)
        expect(spy).toBeCalledTimes(1);
    })

    it('Get Restaurants By Id Given Id',async() => {
        const spy = jest
        .spyOn(RestaurantRepository, "GetRestaurantById")
        .mockResolvedValueOnce([]);

        const controller = new RestaurantController(database);
        let data;
        for(let i = 1; i <= 3; i++) {
            spy.mockReset();
            data = await controller.GetRestaurantById(i);
            expect(spy).toBeCalledWith(database,i)
            expect(spy).toBeCalledTimes(1);
        }
        spy.mockRestore();
    })

    it('Draw Restaurants without query', async()=>{
        const controller = new RestaurantController(database);
        const spy = jest
        .spyOn(RestaurantRepository, "DrawRestaurants")
        .mockResolvedValueOnce([]);
        const data = await controller.PostDrawRestaurants();
        expect(data).toBeInstanceOf(Array);
        expect(spy).toBeCalledTimes(1);
        spy.mockRestore();

    })

    it('Draw restaurants with query',async () => {
        const controller = new RestaurantController(database);
        const spy = jest
        .spyOn(RestaurantRepository, "DrawRestaurants")
        .mockResolvedValueOnce([]);

        const drawRequest = {
            locationId: 1, priceFrom: 0, priceTo: 0
        };

        const data = await controller.PostDrawRestaurants(drawRequest);
        expect(spy).toBeCalledWith(database,drawRequest)
        expect(spy).toBeCalledTimes(1);
        spy.mockRestore();

    })

    it('Draw restaurants with query given queries',async () => {
        const controller = new RestaurantController(database);
        const spy = jest
        .spyOn(RestaurantRepository, "DrawRestaurants")
        .mockResolvedValueOnce([]);

        const DrawRequests = [
            { locationId: 1, priceFrom: 0, priceTo: null },
            { locationId: 2, priceFrom: 50, priceTo: 100 },
            { locationId: 3, priceFrom: null, priceTo: 300 },
        ]
        let data;
        for(const query of DrawRequests) {
            spy.mockReset();
            data = await controller.PostDrawRestaurants(query as DrawRequest);
            expect(spy).toBeCalledWith(database,query)
            expect(spy).toBeCalledTimes(1);
        }
        spy.mockRestore();
    })
})