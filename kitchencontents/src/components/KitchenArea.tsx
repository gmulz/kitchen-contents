import React from 'react';
import Category from '../models/Category';
import Food from '../models/Food';
import KitchenArea from '../models/KitchenArea';
import KitchenAPIService from '../services/apiService';
import CategoryComponent from './Category';


interface KitchenAreaProps {
    kitchenArea: KitchenArea;
    categories: Category[];
    foods: Food[];
}

class KitchenAreaComponent extends React.Component<KitchenAreaProps, {}> {
    
    constructor(props) {
        super(props);
    }

    render() {
        const categoryComponents = this.props.categories.map(cat => {
            const food = this.props.foods.filter(food => food.category === cat.id);
            return <CategoryComponent category={cat} foods={food}></CategoryComponent>
        })
        return (
        <div>
            <div>
                <h1>{this.props.kitchenArea.name}</h1>
            </div>
            {categoryComponents}
        </div>
        );
    }
}

export default KitchenAreaComponent;