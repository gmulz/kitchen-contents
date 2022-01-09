import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import React from 'react';
import Food from '../models/Food';
import { formatDateYMD } from '../utils/DateUtils';
import { DateButton } from './CategoryStyles';
import { Description, ExpirationDate, FoodItem, Icon, InfoContainer, NameInput, QuantitySpinner } from './FoodItemStyles';
import DatePicker from 'react-datepicker';


interface FoodItemProps {
    foodItem: Food;
    updateFood: (f: Food) => Promise<void>;
    deleteFood: (f: Food) => Promise<void>;
    parity: boolean;
}

interface FoodItemState {
    hovering: boolean;
    editName: string;
    editDate: Date;
    showDatePicker: boolean;
    editing: boolean;
}

class FoodItemComponent extends React.Component<FoodItemProps, FoodItemState> {
    node: HTMLDivElement | null = null;
    outsideClickHandler: (e: any) => void;

    constructor(props) {
        super(props)
        this.state = {
            hovering: false,
            editName: props.foodItem.name,
            editDate: new Date(props.foodItem.expiry_date),
            showDatePicker: false,
            editing: false
        }
        this.outsideClickHandler = this.handleOutsideClick.bind(this);
    }

    handleOutsideClick(e) {
        if (this.node && !this.node.contains(e.target)) {
            this.makeUnEditable();
        }
    }

    async spinQuantity(e) {
        const newQuantity = Number(e.target.value);
        if (newQuantity < 0) {
            return;
        }
        const newFood: Food = {...this.props.foodItem, quantity: e.target.value};
        await this.props.updateFood(newFood);
    }

    handleMouseOver(e) {
        this.setState({hovering: true});
    }

    handleMouseLeave(e) {
        this.setState({hovering: false});
    }

    changeEditName(e) {
        this.setState({editName: e.target.value});
    }

    changeEditDate(date: Date) {
        this.setState({editDate: date, showDatePicker: false});
    }

    onClickDate() {
        this.setState({showDatePicker: !this.state.showDatePicker});
    }

    async clickDelete(e) {
        document.removeEventListener('click', this.outsideClickHandler, false);
        await this.props.deleteFood(this.props.foodItem);
    }

    clickEdit(e) {
        e.preventDefault();
        this.makeEditable();
    }

    makeEditable() {
        this.setState({editing: true, editName: this.props.foodItem.name, editDate: new Date(this.props.foodItem.expiry_date)})
        document.addEventListener('click', this.outsideClickHandler, false);
    }

    async makeUnEditable() {
        document.removeEventListener('click', this.outsideClickHandler, false);
        await this.props.updateFood({...this.props.foodItem, name: this.state.editName, expiry_date: this.state.editDate.toDateString()});
        this.setState({editing: false, showDatePicker: false, hovering: false});
    }

    render() {
        return (
        <FoodItem
            parity={this.props.parity}
            ref={node => {this.node = node}}
            onMouseOver={this.handleMouseOver.bind(this)} 
            onMouseLeave={this.handleMouseLeave.bind(this)}>
            <QuantitySpinner 
                type="number"
                value={this.props.foodItem.quantity}
                onChange={this.spinQuantity.bind(this)}
            />
            {(this.state.editing || this.props.foodItem.quantity === 0) && <Icon className={'fa fa-trash'} onClick={this.clickDelete.bind(this)}/>}
            <InfoContainer hidden={this.state.editing}>
                <Description>{this.props.foodItem.name}</Description>
                {this.state.hovering && <Icon className={'fa fa-edit'} onClick={this.clickEdit.bind(this)}/>}
                <ExpirationDate>{formatDateYMD(this.props.foodItem.expiry_date)}</ExpirationDate>
            </InfoContainer>
            {this.state.editing && (<>
                <NameInput
                    type='text'
                    value={this.state.editName}
                    placeholder='Description'
                    onChange={this.changeEditName.bind(this)}
                    />
                <DateButton onClick={this.onClickDate.bind(this)}>
                    {moment(this.state.editDate).format('MMM DD YY')}
                </DateButton>
                {this.state.showDatePicker && <DatePicker selected={this.state.editDate} inline onChange={this.changeEditDate.bind(this)} />}
            </>)}
        </FoodItem>
        )
    }
}

export default FoodItemComponent;