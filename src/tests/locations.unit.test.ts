import LocationController from '../controllers/LocationController';
import database from '../configs/database';
import * as LocationRepository from '../repositories/LocationRepository';

describe('Location Repository Unit Test', () => {
    it('Get Locations without parameters', async () => {
        const data = await LocationRepository.GetLocations(database);
        expect(data).toBeInstanceOf(Array);
    })
    it('Get Locations with filter parameter only', async () => {
        const data = await LocationRepository.GetLocations(database, "");
        expect(data).toBeInstanceOf(Array);
    })
    it('Get Locations with filter and paging parameters', async () => {
        const data = await LocationRepository.GetLocations(database, "",10,0);
        expect(data).toBeInstanceOf(Array);
        expect(data.length <= 10).toBeTruthy()
    })
    it('Get Location by id', async () => {
        const data = await LocationRepository.GetLocationById(database, 1);
        expect(data).toBeInstanceOf(Object);
    })
})

describe('Location Container Unit Test', () => {

    it('Get Locations without parameters', async()=>{
        const spy = jest
        .spyOn(LocationRepository, "GetLocations")
        .mockResolvedValueOnce([]);

        const controller = new LocationController(database);
        const data = await controller.GetLocations();
        expect(data).toBeInstanceOf(Array);
        spy.mockRestore();
    })

    it('Get Locations with parameters', async()=>{
        const spy = jest
        .spyOn(LocationRepository, "GetLocations")
        .mockResolvedValueOnce([]);

        const controller = new LocationController(database);
        const data = await controller.GetLocations("",10,0);
        expect(data).toBeInstanceOf(Array);
        expect(data.length <= 10).toBeTruthy()
        expect(spy).toBeCalledWith(database,"",10,0)
        expect(spy).toBeCalledTimes(1);
        spy.mockRestore();
    })

    it('Get Locations with parameters given parameters', async()=>{
        const spy = jest
        .spyOn(LocationRepository, "GetLocations")
        .mockResolvedValueOnce([]);

        const params = [
            { filter: "", skip: 0, take: 10 },
            { filter: "ABC", skip: 10, take: 20 }
        ]
        const controller = new LocationController(database);
        let data;
        for(const param of params) {
            spy.mockReset();
            data = await controller.GetLocations(param.filter,param.take,param.skip);
            expect(spy).toBeCalledWith(database,param.filter,param.take, param.skip)
        }
        spy.mockRestore();
    })

    it('Get Location By Id',async() => {
        const spy = jest
        .spyOn(LocationRepository, "GetLocationById")
        .mockResolvedValueOnce({});

        const controller = new LocationController(database);
        const data = await controller.GetLocationById(1);
        expect(data).toBeInstanceOf(Object);
        spy.mockRestore();
    })

    it('Get Location By Id Given Id',async() => {
        const spy = jest
        .spyOn(LocationRepository, "GetLocationById")
        .mockResolvedValueOnce({});

        const controller = new LocationController(database);
        let data;
        for(let i = 1; i <= 3; i++) {
            spy.mockReset();
            data = await controller.GetLocationById(i);
            expect(spy).toBeCalledWith(database,i)
            expect(spy).toBeCalledTimes(1);
        }
        spy.mockRestore();
    })
})