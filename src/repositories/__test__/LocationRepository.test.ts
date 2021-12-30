import database from '../../configs/database';
import * as repo from '../LocationRepository';
import MockMysql from 'mysql2/promise';
jest.mock('mysql2/promise')

const baseSQL = "SELECT `id`,`zh_name`,`en_name` FROM `locations` WHERE `visible` = 1"

describe('Location Repository Config', () => {

    it("Check baseSQL", () =>{
        expect(repo.baseSQL).toEqual(baseSQL)
    })
});

describe('Location Repository Function - Count Restaurants', () => {

    it.each([1,2,3])("Count by location id %d",async (id)=>{
        const connection = await database('','','','');
        connection.execute.mockClear()
        connection.execute.mockReturnValue([[{ total: id }],null])
        const result = await repo.CountRestaurants(connection, id);
        const expectSQL = "SELECT COUNT(1) as 'total' FROM `restaurants` WHERE `visible` = 1 AND `location_id` = ?;";
        const expectData = [id]
        expect(connection.execute).toBeCalledTimes(1);
        expect(connection.execute).toBeCalledWith(expectSQL, expectData)
        expect(result).toEqual(id)
    })
})

describe("Location Repository Function - Get Locations", ()=>{
    const requests = [
        { param: { filter: "DEF", take: 10, skip: 20}, expectData:["%DEF%","%DEF%",20,10], expectSQL: repo.baseSQL+" AND (`zh_name` LIKE ? OR `en_name` LIKE ?) LIMIT ?, ?;", expectResult: ["ABC"]},
        { param: { filter: "GHI", take: 20, skip: 30}, expectData:["%GHI%","%GHI%",30,20], expectSQL: repo.baseSQL+" AND (`zh_name` LIKE ? OR `en_name` LIKE ?) LIMIT ?, ?;", expectResult: ["EFG"]},
        { param: null, expectData:[], expectSQL: repo.baseSQL+";", expectResult: ["EFG"]},
    ]
    it.each(requests)("Get by %o", async(request)=>{
        const connection = await database('','','','');
        connection.execute.mockClear();
        connection.execute.mockReturnValue([request.expectResult,null])
        const result = await repo.GetLocations(connection, request.param);
        expect(connection.execute).toBeCalledWith(request.expectSQL, request.expectData);
        expect(connection.execute).toBeCalledTimes(1);
        expect(result).toEqual(request.expectResult)
    })
})

describe("Location Repository Function - Get Location By Id", () => {
    const requests = [
        { param: 1, expectData: [1], expectSQL: baseSQL + " AND `id` = ?;", mockResult: [], expectResult: null},
        { param: 2, expectData: [2], expectSQL: baseSQL + " AND `id` = ?;", mockResult: [2], expectResult: 2},
    ]
    it.each(requests)("Get by %o", async(request)=>{
        const connection = await database('','','','');
        connection.execute.mockClear();
        connection.execute.mockReturnValue([request.mockResult,null])
        const result = await repo.GetLocationById(connection, request.param);
        expect(connection.execute).toBeCalledTimes(1);
        expect(connection.execute).toBeCalledWith(request.expectSQL, request.expectData)
        expect(result).toEqual(request.expectResult)
    })
})