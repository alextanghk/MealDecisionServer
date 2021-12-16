import * as TagRepository from '../repositories/TagRepository';

export default class TagController {

    private database = null;

    constructor(db:any) {
        this.database = db;
    }

    public async GetTags(filter?:string, skip?:number, take?:number) {
        return []
    }
    public async GetTagById(id:number) {
        return []

    }
}