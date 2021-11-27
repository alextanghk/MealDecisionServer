
import { DrawRequest } from "../types/Restaurants";

export const GetRestaurants = async (connection:any, filter?:string, take?:number, skip?:number) => {
    const result = await connection.execute('SELECT * FROM restaurants;');
    return [{
        id: 1,
        zh_name: 'test',
        en_name: "test"
    }];
}

export const GetRestaurantById = async (connection:any, id: number) => {
    const result = await connection.execute('SELECT * FROM restaurants;');

    return {};
}

export const DrawRestaurants = async(connection:any, request?: DrawRequest) => {
    const result = await connection.execute('SELECT * FROM restaurants;');

    return [];
}