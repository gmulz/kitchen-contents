import React from 'react';
import Food from '../models/Food';
import { formatDateYMD } from '../utils/DateUtils';
import { Description, ExpirationDate, FoodItem, QuantitySpinner } from './FoodItemStyles';


interface FoodItemProps {
    foodItem: Food;
}

interface FoodItemState {

}

class FoodItemComponent extends React.Component<FoodItemProps, FoodItemState> {
    constructor(props) {
        super(props)
        
    }

    render() {
        return (
        <FoodItem>
            <QuantitySpinner 
                type="number"
                value={this.props.foodItem.quantity}
            />
            <Description>{this.props.foodItem.name}</Description>
            <ExpirationDate>{formatDateYMD(this.props.foodItem.expiry_date)}</ExpirationDate>
            
        </FoodItem>
        )
    }
}

export default FoodItemComponent;