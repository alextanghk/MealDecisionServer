import TagController from '../controllers/TagController';
import database from '../configs/database';
import * as TagRepository from '../repositories/TagRepository';

describe('Tag Repository Unit Test', () => {
    it('Get Tags without parameter', async () => {
        const data = await TagRepository.GetTags(database);
        expect(data).toBeInstanceOf(Array);
    })
    it('Get Tags with filter parameter only', async () => {
        const data = await TagRepository.GetTags(database,"");
        expect(data).toBeInstanceOf(Array);
    })
    it('Get Tags with filter and paging parameters', async () => {
        const data = await TagRepository.GetTags(database,"",10,0);
        expect(data).toBeInstanceOf(Array);
        expect(data.length <= 10).toBeTruthy()
    })
    it('Get Tag by id', async () => {
        const data = await TagRepository.GetTagById(database,1);
        expect(data).toBeInstanceOf(Object);
    })
})

describe('Tag Container Unit Test', () => {

    it('Get Tags without parameters', async()=>{
        const spy = jest
        .spyOn(TagRepository, "GetTags")
        .mockResolvedValueOnce([]);

        const controller = new TagController(database);
        const data = await controller.GetTags();
        expect(data).toBeInstanceOf(Array);
        spy.mockRestore();
    })

    it('Get Tags with parameters', async()=>{
        const spy = jest
        .spyOn(TagRepository, "GetTags")
        .mockResolvedValueOnce([]);

        const controller = new TagController(database);
        const data = await controller.GetTags("",10,0);
        expect(data).toBeInstanceOf(Array);
        expect(data.length <= 10).toBeTruthy()
        expect(spy).toBeCalledWith(database,"",10,0)
        expect(spy).toBeCalledTimes(1);
        spy.mockRestore();
    })

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
            spy.mockReset();
            data = await controller.GetTags(param.filter,param.take,param.skip);
            expect(spy).toBeCalledWith(database,param.filter,param.take,param.skip);
        }

        spy.mockRestore();
    })
    it('Get Tag By Id',async() => {
        const spy = jest
        .spyOn(TagRepository, "GetTagById")
        .mockResolvedValueOnce({});

        const controller = new TagController(database);
        const data = await controller.GetTagById(1);
        expect(data).toBeInstanceOf(Object);
        spy.mockRestore();
    })
    it('Get Tag By Id Given Id',async() => {
        const spy = jest
        .spyOn(TagRepository, "GetTagById")
        .mockResolvedValueOnce({});

        const controller = new TagController(database);
        let data;
        for(let i = 1; i <= 3;i++) {
            spy.mockReset();
            data = await controller.GetTagById(i);
            expect(spy).toBeCalledWith(database,i)
            expect(spy).toBeCalledTimes(1);
        }

        spy.mockRestore();
    })
})