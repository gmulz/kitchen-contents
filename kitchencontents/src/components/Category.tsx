import React from 'react';
import Category from '../models/Category';
import Food from '../models/Food';
import FoodItemComponent from './FoodItem';

export interface CategoryComponentProps {
    category: Category;
    foods: Food[];
}

export interface CategoryComponentState {
    inputName: string;
    inputExpirationDate: Date;
    inputQuantity: number;
}

class CategoryComponent extends React.Component<CategoryComponentProps, CategoryComponentState> {
    constructor(props) {
        super(props);
        this.state = {
            inputName: '',
            inputExpirationDate: new Date(),
            inputQuantity: 0
        }
    }

    async componentDidMount() {

    }

    render() {
        let foodComponents = this.props.foods.map(food => <FoodItemComponent foodItem={food}></FoodItemComponent>)
        return (
        <div className='category'>
            <div className='category-header'>
                <div className='category-title-area'>
                    <span className='category-title'>{this.props.category.name}</span>
                </div>
                <div className='new-food-creator'>
                    New Food: <input 
                        type='text'
                        value={this.state.inputName}
                        placeholder='Description'
                    />
                    <input type='number'
                        value={this.state.inputQuantity}
                        placeholder='Quantity'
                    />
                    <button className='date-button'>
                        
                    </button>
                </div>
            </div>
            <div>
                {foodComponents}
            </div>
        </div>
        )
    }
}

export default CategoryComponent;