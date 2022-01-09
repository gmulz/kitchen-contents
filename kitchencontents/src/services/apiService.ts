import { apiURL } from '../environment';
import Food from '../models/Food';
import Category from '../models/Category';
import KitchenArea from '../models/KitchenArea';
import { formatDateYMD } from '../utils/DateUtils';

const POST_INFO = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'}
}

const PUT_INFO = {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'}
}

const DELETE_INFO = {
    method: 'DELETE',
}

export default class KitchenAPIService {
    static async getAllFood() {
        const response = await fetch(apiURL + `/food/`);
        return await response.json() as Food[];
    }

    static async postNewFood(food: Food) {
        const response = await fetch(apiURL + `/food/`, {
            ...POST_INFO,
            body: JSON.stringify({
                name: food.name,
                expiry_date: formatDateYMD(food.expiry_date),
                kitchen_area: food.kitchen_area,
                quantity: food.quantity,
                category: food.category 
            })
        });
        const responseObj = await response.json();
        return {...food, id: responseObj.id} as Food;
    }

    //update food
    static async updateFood(food: Food) {
        const response = await fetch(`${apiURL}/food/${food.id}/`, {
            ...PUT_INFO,
            body: JSON.stringify({
                ...food,
                expiry_date: formatDateYMD(food.expiry_date)
            })
        });
        const responseObj = await response.json();
        return responseObj as Food;
    }
    //delete food
    static async deleteFood(food: Food) {
        const response = await fetch(`${apiURL}/food/${food.id}/`, {
            ...DELETE_INFO,
        });
        const status = response.status;
        return food;
    }

    static async getCategories() {
        const response = await fetch(apiURL + '/categories/');
        return await response.json() as Category[];
    }

    static async getKitchenAreas() {
        const response = await fetch(apiURL + '/kitchen_areas/')
        return await response.json() as KitchenArea[];
    }
} 