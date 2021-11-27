import TagController from '../TagController';
import database from '../../configs/database';
import * as TagRepository from '../../repositories/TagRepository';
import MockMysql from 'mysql2/promise';
jest.mock('mysql2/promise');

TagRepository.GetTags = jest.fn(()=>[]);
TagRepository.GetTagById = jest.fn(()=>{});

describe('Tag Container Unit Test', () => {

    it('Get Tags with parameters given parameters', async()=>{
        const spy = jest
        .spyOn(TagRepository, "GetTags")
        .mockResolvedValueOnce([]);

        const params = [
            { filter: "", skip: 0, take: 10 },
            { filter: "ABC", skip: 10, take: 20 }
        ]

        const controller = new TagController(database);
        let data;

        for(const param of params) {
            TagRepository.GetTags.mockClear();
            data = await controller.GetTags(param.filter,param.take,param.skip);
            expect(TagRepository.GetTags).toBeCalledWith(database,param.filter,param.take,param.skip);
            expect(TagRepository.GetTags).toBeCalledTimes(1);

        }
    })

    it('Get Tag By Id Given Id',async() => {

        const controller = new TagController(database);
        let data;
        for(let i = 1; i <= 3;i++) {
            TagRepository.GetTagById.mockClear();
            data = await controller.GetTagById(i);
            expect(TagRepository.GetTagById).toBeCalledWith(database,i)
            expect(TagRepository.GetTagById).toBeCalledTimes(1);
        }
    })
})