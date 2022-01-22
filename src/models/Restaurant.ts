export default interface Restaurant {
    id: number,
    location_id: number,
    range_id: number,
    name: string,
    zh_address: string,
    en_address: string,
    visible: boolean,
    created_at: Date,
    updated_at: Date
}