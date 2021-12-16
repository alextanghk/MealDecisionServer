import NodeCache from 'node-cache'

export default class CacheLoader {

    private cacheType:string = '';
    private supportType:Array<string> = ['LOCAL']

    constructor(
        cacheType: string = ''
    ) {
        this.cacheType = cacheType.toUpperCase()
        if (this.supportType.indexOf(this.cacheType) < 0) {
            throw 'Cache Type Not Supported'
        }
    }

    public has(key:string) {
        const cache = new NodeCache();
        const data = cache.get(key)

        return data !== undefined
    }

    public get(key:string) {
        const cache = new NodeCache();
        const data = cache.get(key)
        return data
    }

    public set(key:string, data:any) {
        const cache = new NodeCache();
        return cache.set(key, data)
    }
}