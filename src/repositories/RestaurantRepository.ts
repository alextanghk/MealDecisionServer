
import { DrawRequest } from "../types/Restaurants";

export const GetRestaurants = async (database:any, filter?:string, take?:number, skip?:number) => {
    return [{
        id: 1,
        zh_name: 'test',
        en_name: "test"
    }];
}

export const GetRestaurantById = async (database:any, id: number) => {
    return {};
}

export const DrawRestaurants = async(database:any, request?: DrawRequest) => {
    return [];
}