import RestaurantController from '../RestaurantController';
import * as RestaurantRepository from '../../repositories/RestaurantRepository';
import { DrawRequest } from "../../types/Restaurants";
import database from '../../configs/database';
import MockMysql from 'mysql2/promise';
jest.mock('mysql2/promise');


RestaurantRepository.GetRestaurants = jest.fn(()=>[]);
RestaurantRepository.GetRestaurantById = jest.fn(()=>{});
RestaurantRepository.DrawRestaurants = jest.fn(()=>{});

describe('Restaurants Container Unit Test', () => {

    it('Get Restaurants with parameters given parameters', async()=>{
        const params = [
            { filter: "", skip: 0, take: 10 },
            { filter: "ABC", skip: 10, take: 20 }
        ]
        const connection = await database('','','','');

        const controller = new RestaurantController(connection);
        let data;
        for(const param of params) {
            RestaurantRepository.GetRestaurants.mockClear();
            data = await controller.GetRestaurants(param.filter,param.take,param.skip);
            expect(RestaurantRepository.GetRestaurants).toBeCalledWith(database,param.filter,param.take, param.skip);
            expect(RestaurantRepository.GetRestaurants).toBeCalledTimes(1);
        }
    })

    it('Get Restaurants By Id Given Id',async() => {

        const connection = await database('','','','');

        const controller = new RestaurantController(connection);
        let data;
        for(let i = 1; i <= 3; i++) {
            RestaurantRepository.GetRestaurantById.mockClear();
            data = await controller.GetRestaurantById(i);
            expect(RestaurantRepository.GetRestaurantById).toBeCalledWith(database,i)
            expect(RestaurantRepository.GetRestaurantById).toBeCalledTimes(1);
        }
    })

    it('Draw restaurants with query given queries',async () => {
        const connection = await database('','','','');

        const controller = new RestaurantController(connection);
        const DrawRequests = [
            { locationId: 1, priceFrom: 0, priceTo: null },
            { locationId: 2, priceFrom: 50, priceTo: 100 },
            { locationId: 3, priceFrom: null, priceTo: 300 },
        ]
        let data;
        for(const query of DrawRequests) {
            RestaurantRepository.DrawRestaurants.mockClear();
            data = await controller.PostDrawRestaurants(query as DrawRequest);
            expect(RestaurantRepository.DrawRestaurants).toBeCalledWith(database,query)
            expect(RestaurantRepository.DrawRestaurants).toBeCalledTimes(1);
        }
    })
})