import { apiURL } from '../environment';
import Food from '../models/Food';
import Category from '../models/Category';
import KitchenArea from '../models/KitchenArea';

export default class KitchenAPIService {
    static async getAllFood() {
        let response = await fetch(apiURL + `/food/`);
        return await response.json() as Food[];
    }

    static async getCategories() {
        let response = await fetch(apiURL + '/categories/');
        return await response.json() as Category[];
    }

    static async getKitchenAreas() {
        let response = await fetch(apiURL + '/kitchen_areas/')
        return await response.json() as KitchenArea[];
    }
}