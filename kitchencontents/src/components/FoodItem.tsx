import React from 'react';
import Food from '../models/Food';


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
        <div>
            {this.props.foodItem.name}
            {this.props.foodItem.expiry_date}
            <span>{this.props.foodItem.quantity}</span>
        </div>
        )
    }
}

export default FoodItemComponent;