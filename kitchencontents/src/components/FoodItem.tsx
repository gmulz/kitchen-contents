import React from 'react';
import Food from '../models/Food';
import { formatDateYMD } from '../utils/DateUtils';
import { Description, ExpirationDate, FoodItem, QuantitySpinner } from './FoodItemStyles';


interface FoodItemProps {
    foodItem: Food;
    updateFood: (f: Food) => Promise<void>;
    deleteFood: (f: Food) => Promise<void>;
}

interface FoodItemState {

}

class FoodItemComponent extends React.Component<FoodItemProps, FoodItemState> {
    constructor(props) {
        super(props)
        
    }

    async spinQuantity(e) {
        const newFood: Food = {...this.props.foodItem, quantity: e.target.value};
        await this.props.updateFood(newFood);
    }

    render() {
        return (
        <FoodItem>
            <QuantitySpinner 
                type="number"
                value={this.props.foodItem.quantity}
                onChange={this.spinQuantity.bind(this)}
            />
            <Description>{this.props.foodItem.name}</Description>
            <ExpirationDate>{formatDateYMD(this.props.foodItem.expiry_date)}</ExpirationDate>
            
        </FoodItem>
        )
    }
}

export default FoodItemComponent;