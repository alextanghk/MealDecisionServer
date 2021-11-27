export const GetTags = async (connection:any, filter?:string, take?:number, skip?:number) => {
    const result = connection.execute('SELECT * FROM restaurants;');
    
    return [];
}
export const GetTagById = async (connection:any, id:number) => {
    const result = connection.execute('SELECT * FROM restaurants;');

    return {};
}