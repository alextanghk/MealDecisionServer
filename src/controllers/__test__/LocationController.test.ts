import LocationController from '../LocationController';
import database from '../../configs/database';
import * as LocationRepository from '../../repositories/LocationRepository';
import MockMysql from 'mysql2/promise';
jest.mock('mysql2/promise');

LocationRepository.GetLocations = jest.fn(()=>[]);
LocationRepository.GetLocationById = jest.fn(()=>{});

describe('Location Container Unit Test', () => {


    it('Get Locations with parameters given parameters', async()=>{

        const connection = await database('','','','');

        const params = [
            { filter: "", skip: 0, take: 10 },
            { filter: "ABC", skip: 10, take: 20 }
        ]
        const controller = new LocationController(connection);
        let data;
        for(const param of params) {
            LocationRepository.GetLocations.mockClear();
            data = await controller.GetLocations(param.filter,param.take,param.skip);
            expect(LocationRepository.GetLocations).toBeCalledWith(connection,param.filter,param.take, param.skip)
            expect(LocationRepository.GetLocations).toBeCalledTimes(1);
        }
    })

    it('Get Location By Id Given Id',async() => {
        const connection = await database('','','','');

        const controller = new LocationController(connection);
        let data;
        for(let i = 1; i <= 3; i++) {
            LocationRepository.GetLocationById.mockClear();
            data = await controller.GetLocationById(i);
            expect(LocationRepository.GetLocationById).toBeCalledWith(connection,i)
            expect(LocationRepository.GetLocationById).toBeCalledTimes(1);
        }
    })
})