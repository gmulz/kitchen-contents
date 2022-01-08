import React from 'react';
import Category from '../models/Category';
import Food from '../models/Food';
import KitchenArea from '../models/KitchenArea';
import KitchenAPIService from '../services/apiService';
import CategoryComponent from './Category';
import { KitchenAreaContainer } from './KitchenAreaStyles';


interface KitchenAreaProps {
    kitchenArea: KitchenArea;
    categories: Category[];
    foods: Food[];
    sendNewFood: (f: Food) => Promise<void>;
}

class KitchenAreaComponent extends React.Component<KitchenAreaProps, {}> {
    
    constructor(props) {
        super(props);
    }

    render() {
        const categoryComponents = this.props.categories.map(cat => {
            const food = this.props.foods.filter(food => food.category === cat.id);
            return <CategoryComponent 
                        category={cat} 
                        foods={food} 
                        sendNewFood={this.props.sendNewFood} 
                        kitchenArea={this.props.kitchenArea}
                        />
        })
        return (
        <KitchenAreaContainer>
            <div>
                <h1>{this.props.kitchenArea.name}</h1>
            </div>
            {categoryComponents}
        </KitchenAreaContainer>
        );
    }
}

export default KitchenAreaComponent;