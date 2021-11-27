
export const GetLocations = async (connection:any, filter?:string, take?:number, skip?:number) => {
    const result = await connection.execute("SELECT * FROM locations;");
    return [{
        id: 1,
        zh_name: 'test',
        en_name: "test"
    }];
}

export const GetLocationById = async (connection:any, id: number) => {
    const result = await connection.execute("SELECT * FROM locations;");
    return {};
}