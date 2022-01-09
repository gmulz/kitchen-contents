import moment from 'moment';
import React from 'react';
import Category from '../models/Category';
import Food from '../models/Food';
import { CategoryContainer, CategoryHeader, CategoryTitle, CategoryTitleContainer, DateButton, NameInput, NewFoodCreator, QuantitySpinner } from './CategoryStyles';
import FoodItemComponent from './FoodItem';
import DatePicker from 'react-datepicker';
import KitchenArea from '../models/KitchenArea';

export interface CategoryComponentProps {
    category: Category;
    foods: Food[];
    sendNewFood: (food: Food) => Promise<void>;
    updateFood: (food: Food) => Promise<void>;
    deleteFood: (food: Food) => Promise<void>;
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

    async onKeyPress(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const food: Food = { 
                name: this.state.inputName, 
                expiry_date: this.state.inputExpirationDate.toDateString(), 
                quantity: this.state.inputQuantity,
                kitchen_area: this.props.kitchenArea.id,
                category: this.props.category.id,
            } as Food; 
            await this.props.sendNewFood(food);
            this.setState({ inputName: '', inputExpirationDate: new Date(), inputQuantity: 0});
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
        let foodComponents = this.props.foods.map((food, idx) => <FoodItemComponent foodItem={food} 
                                                                             updateFood={this.props.updateFood} 
                                                                             deleteFood={this.props.deleteFood} 
                                                                             parity={idx % 2 === 0}
                                                                             />);
        return (
        <CategoryContainer>
            <CategoryHeader>
                <CategoryTitleContainer>
                    <CategoryTitle>{this.props.category.name}</CategoryTitle>
                </CategoryTitleContainer>
                <NewFoodCreator
                    onKeyPress={this.onKeyPress.bind(this)}
                >
                    <NameInput 
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
            </CategoryHeader>
            <div>
                {foodComponents}
            </div>
        </CategoryContainer>
        )
    }
}

export default CategoryComponent;