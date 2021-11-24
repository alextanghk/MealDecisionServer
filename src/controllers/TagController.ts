import * as TagRepository from '../repositories/TagRepository';

export default class TagController {

    private database = null;

    constructor(db:any) {
        this.database = db;
    }

    public async GetTags(filter?:string, take?:number, skip?:number) {
        const data = await TagRepository.GetTags(this.database, filter, take, skip);
        return data;
    }
    public async GetTagById(id:number) {
        const data = await TagRepository.GetTagById(this.database, id);
        return data;
    }
}