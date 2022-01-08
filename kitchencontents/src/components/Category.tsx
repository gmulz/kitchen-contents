import moment from 'moment';
import React from 'react';
import Category from '../models/Category';
import Food from '../models/Food';
import { DateButton, NewFoodCreator, QuantitySpinner } from './CategoryStyles';
import FoodItemComponent from './FoodItem';
import DatePicker from 'react-datepicker';
import KitchenArea from '../models/KitchenArea';

export interface CategoryComponentProps {
    category: Category;
    foods: Food[];
    sendNewFood: (food: Food) => Promise<void>;
    kitchenArea: KitchenArea;
}

export interface CategoryComponentState {
    inputName: string;
    inputExpirationDate: Date;
    inputQuantity: number;
    showDatePicker: boolean;
}

class CategoryComponent extends React.Component<CategoryComponentProps, CategoryComponentState> {
    constructor(props) {
        super(props);
        this.state = {
            inputName: '',
            inputExpirationDate: new Date(),
            inputQuantity: 0,
            showDatePicker: false
        }
    }

    async componentDidMount() {

    }

    onKeyPress(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const food: Food = { 
                name: this.state.inputName, 
                expiry_date: this.state.inputExpirationDate, 
                quantity: this.state.inputQuantity,
                kitchen_area: this.props.kitchenArea.id,
                category: this.props.category.id,
            } as Food; 
            this.props.sendNewFood(food);
        }
    }

    changeName(e) {
        this.setState({inputName: e.target.value});
    }

    changeQuantity(e) {
        this.setState({inputQuantity: e.target.value});
    }

    changeDate(date: Date) {
        this.setState({
            inputExpirationDate: date,
            showDatePicker: false,
        });
    }

    onClickDate() {
        this.setState({showDatePicker: !this.state.showDatePicker});
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
                        onChange={this.changeName.bind(this)}
                    />
                    <QuantitySpinner type='number'
                        value={this.state.inputQuantity}
                        placeholder='#'
                        onChange={this.changeQuantity.bind(this)}
                    />
                    <DateButton onClick={this.onClickDate.bind(this)}>
                        {moment(this.state.inputExpirationDate).format('MMM DD YY')}
                    </DateButton>
                    {this.state.showDatePicker && <DatePicker selected={this.state.inputExpirationDate} inline onChange={this.changeDate.bind(this)} />}
                    
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