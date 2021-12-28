import database from '../../configs/database';
import * as repo from '../RestaurantRepository';
import MockMysql from 'mysql2/promise';
import { request } from 'express';
jest.mock('mysql2/promise');

const baseSQL = "SELECT r.`id`,r.`name`,r.`zh_address`, r.`en_address`, l.`zh_name` AS 'loc_zh_name', l.`en_name` AS 'loc_en_name', p.`content` AS 'price_range'"
            + " FROM `restaurants` r"
            + " LEFT JOIN `locations` l ON r.`location_id` = l.`id`"
            + " LEFT JOIN `price_ranges` p ON r.`range_id` = p.`id`"
            + " WHERE r.`visible` = 1";

describe('Restaurant Repository Config', () => {
    it("Check baseSQL", () =>{
        expect(repo.baseSQL).toEqual(baseSQL)
    })
});

describe('Restaurant Repository Function - Get Restaurants', () => {
    const requests = [
        { param: { locationId: 0, filter: "ABC", skip: 0, take: 5}, expectData: ["ABC",0,5], expectSQL: repo.baseSQL+" AND r.`name` LIKE '%?%' LIMIT ?, ?;", expectResult: []},
        { param: { locationId: 1, filter: "DEF", skip: 20, take: 10}, expectData: [1,"DEF",20,10], expectSQL: repo.baseSQL+" AND r.`location_id` = ? AND r.`name` LIKE '%?%' LIMIT ?, ?;", expectResult: []}
    ]
    it.each(requests)("Get by %o", async(request)=> {
        const connection = await database('','','','');
        connection.execute.mockClear();
        connection.execute.mockReturnValue([request.expectResult,null])
        const result = await repo.GetRestaurants(connection, request.param.locationId, request.param);
        expect(connection.execute).toBeCalledTimes(1);
        expect(connection.execute).toBeCalledWith(request.expectSQL, request.expectData)
        expect(result).toEqual(request.expectResult)
    })
})

describe('Restaurant Repository Function - Get Restaurant by id', () => {
    const requests = [
        { param: 1, expectData: [1], expectSQL: baseSQL + " AND r.`id` = ?;", mockResult: [], expectResult: null},
        { param: 2, expectData: [2], expectSQL: baseSQL + " AND r.`id` = ?;", mockResult: [2], expectResult: 2},
    ]
    it.each(requests)("Get by %o", async(request)=> {
        const connection = await database('','','','');
        connection.execute.mockClear();
        connection.execute.mockReturnValue([request.mockResult,null])
        const result = await repo.GetRestaurantById(connection, request.param);
        expect(connection.execute).toBeCalledTimes(1);
        expect(connection.execute).toBeCalledWith(request.expectSQL, request.expectData)
        expect(result).toEqual(request.expectResult)
    })
})

describe('Restaurant Repository Function - Get Restaurant Links by id', () => {
    const requests = [
        { id: null, expectData: [], expectSQL: "", expectResult: [] },
        { id: 1, expectData: [1], expectSQL: "SELECT `restaurant_id`,`link`,`type` FROM `restaurant_links` WHERE `visible` = 1 AND `restaurant_id` = ?;", expectResult: ["123"] },
    ]
    it.each(requests)("Get by %o", async(request)=> {
        const connection = await database('','','','');
        connection.execute.mockClear();
        connection.execute.mockReturnValue([request.expectResult,null])
        const result = await repo.GetRestaurantLinksById(connection, request.id);
        if (request.id === null) {
            expect(result).toEqual([])
        } else {
            expect(connection.execute).toBeCalledTimes(1)
            expect(connection.execute).toBeCalledWith(request.expectSQL,request.expectData)
            expect(result).toEqual(request.expectResult)
        }
    })
})

describe('Restaurant Repository Function - Draw Restaurants', () => {
    const requests = [
        { param: null, expectData:[], expectSQL: repo.baseSQL + " ORDER BY RAND();", expectResult: []},
        { param: { locationId: null }, expectData:[], expectSQL: repo.baseSQL + " ORDER BY RAND();", expectResult: [1]},
        { param: { locationId: 0 }, expectData:[], expectSQL: repo.baseSQL + " ORDER BY RAND();", expectResult: [2]},
        { param: { locationId: 1 }, expectData:[1], expectSQL: repo.baseSQL + " AND r.`location_id` = ? ORDER BY RAND();", expectResult: [3]},
        { param: { rangeIds: null }, expectData:[], expectSQL: repo.baseSQL + " ORDER BY RAND();", expectResult: [4]},
        { param: { rangeIds: [] }, expectData:[], expectSQL: repo.baseSQL + " ORDER BY RAND();", expectResult: [5]},
        { param: { rangeIds: [1] }, expectData:[[1]], expectSQL: repo.baseSQL + " AND r.`range_id` IN (?) ORDER BY RAND();", expectResult: [6]},
        { param: { tagIds: null }, expectData:[], expectSQL: repo.baseSQL + " ORDER BY RAND();", expectResult: [7]},
        { param: { tagIds: [] }, expectData:[], expectSQL: repo.baseSQL + " ORDER BY RAND();", expectResult: [8]},
        { param: { tagIds: [1] }, expectData:[[1]], expectSQL: repo.baseSQL + " AND r.`id` IN (SELECT `restaurant_id` FROM `restaurant_tags` WHERE `tag_id` IN (?)) ORDER BY RAND();", expectResult: [9]},
        { param: { numOfRandom: 3 }, expectData:[3], expectSQL: repo.baseSQL + " ORDER BY RAND() LIMIT ?;", expectResult: [10]}
    ]

    it.each(requests)("Get by %o", async(request)=> {
        const connection = await database('','','','');
        connection.execute.mockClear();
        connection.execute.mockReturnValue([request.expectResult,null])
        const result = await repo.DrawRestaurants(connection, request.param);
        expect(result === null).toBeFalsy();
        expect(connection.execute).toBeCalledTimes(1)
        expect(connection.execute).toBeCalledWith(request.expectSQL,request.expectData)
        expect(result).toEqual(request.expectResult)
    })
})
