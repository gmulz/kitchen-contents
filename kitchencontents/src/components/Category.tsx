import moment from 'moment';
import React from 'react';
import Category from '../models/Category';
import Food from '../models/Food';
import { DateButton, NewFoodCreator, QuantitySpinner } from './CategoryStyles';
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

    onKeyPress(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            
        }
    }

    render() {
        let foodComponents = this.props.foods.map(food => <FoodItemComponent foodItem={food}></FoodItemComponent>)
        return (
        <div className='category'>
            <div className='category-header'>
                <div className='category-title-area'>
                    <span className='category-title'>{this.props.category.name}</span>
                </div>
                <NewFoodCreator
                    onKeyPress={this.onKeyPress.bind(this)}
                >
                    New Food: <input 
                        type='text'
                        value={this.state.inputName}
                        placeholder='Description'
                    />
                    <QuantitySpinner type='number'
                        value={this.state.inputQuantity}
                        placeholder='Quantity'
                    />
                    <DateButton>
                        {moment(this.state.inputExpirationDate).format('MMM DD YY')}
                    </DateButton>
                </NewFoodCreator>
            </div>
            <div>
                {foodComponents}
            </div>
        </div>
        )
    }
}

export default CategoryComponent;