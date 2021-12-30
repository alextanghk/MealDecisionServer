import database from '../../configs/database';
import * as repo from '../TagRepository';
import MockMysql from 'mysql2/promise';
jest.mock('mysql2/promise');

const baseSQL = "SELECT `id`, `zh_name`, `en_name` FROM `tags` WHERE `visible` = 1"

describe('Tag Repository Config', () => {
    it("Check baseSQL", () =>{
        expect(repo.baseSQL).toEqual(baseSQL)
    })
});

describe('Tag Repository Function - Count Restaurants', () => {
    it.each([1,2,3])("Count by tag id %d", async(id)=>{
        const connection = await database('','','','');
        connection.execute.mockClear()
        connection.execute.mockReturnValue([[{ total: id }],null])
        const result = await repo.CountRestaurants(connection, id);
        let expectSQL = "SELECT COUNT(1) as 'total' FROM `restaurant_tags` WHERE `tag_id` = ?;";
        let expectData = [id];
        expect(result).not.toEqual(null)
        expect(connection.execute).toBeCalledTimes(1);
        expect(connection.execute).toBeCalledWith(expectSQL, expectData)
        expect(result).toEqual(id)
    })
})

describe('Tag Repository Function - Get Tags', ()=>{
    const requests = [
        { param: { filter: "ABC", take: 5, skip: 10}, expectData: ["%ABC%","%ABC%",10,5], expectSQL: baseSQL+" AND (`zh_name` LIKE ? OR `en_name` LIKE ?) LIMIT ?, ?;", expectResult: ["ABC"] },
        { param: { filter: "DEF", take: 10, skip: 20}, expectData: ["%DEF%","%DEF%",20,10], expectSQL: baseSQL+" AND (`zh_name` LIKE ? OR `en_name` LIKE ?) LIMIT ?, ?;", expectResult: ["DEF"] },
        { param: null, expectData: [], expectSQL: baseSQL+";", expectResult: ["DEF"] },
    ]
    it.each(requests)('Get by %o', async(request)=>{
        const connection = await database('','','','');
        connection.execute.mockClear();
        connection.execute.mockReturnValue([request.expectResult,null])
        const result = await repo.GetTags(connection, request.param);
        expect(connection.execute).toBeCalledTimes(1);
        expect(connection.execute).toBeCalledWith(request.expectSQL, request.expectData)
        expect(result).toEqual(request.expectResult)
    })
})

describe('Tag Repository Function - Get Tag by id', ()=>{
    const requests = [
        { param: 1, expectData: [1], expectSQL: baseSQL + " AND `id` = ?;", mockResult: [], expectResult: null},
        { param: 2, expectData: [2], expectSQL: baseSQL + " AND `id` = ?;", mockResult: [2], expectResult: 2},
    ]
    it.each(requests)('Get by %o', async(request)=>{
        const connection = await database('','','','');
        connection.execute.mockClear();
        connection.execute.mockReturnValue([request.mockResult,null])
        const result = await repo.GetTagById(connection, request.param);
        expect(connection.execute).toBeCalledTimes(1);
        expect(connection.execute).toBeCalledWith(request.expectSQL, request.expectData)
        expect(result).toEqual(request.expectResult)
    })
})
