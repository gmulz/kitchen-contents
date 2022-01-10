import React from 'react';
import logo from './logo.svg';
import './App.css';
import KitchenAPIService from './services/apiService';
import KitchenArea from './models/KitchenArea';
import KitchenAreaComponent from './components/KitchenArea';
import Food from './models/Food';
import Category from './models/Category';
import { KitchenAreasContainer } from './AppStyles';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

interface AppState {
  kitchenAreas: KitchenArea[];
  foods: Food[];
  categories: Category[];
  time: string;
}

class App extends React.Component<{}, AppState> {

  intervalId: NodeJS.Timeout | null;

  constructor(props) {
    super(props);
    this.state = {
      kitchenAreas: [],
      foods: [],
      categories: [],
      time: new Date().toLocaleDateString(),
    }
    this.intervalId = null;
  }

  async componentDidMount() {
    const foods = await KitchenAPIService.getAllFood();
    const categories = await KitchenAPIService.getCategories();
    const kitchenAreas = await KitchenAPIService.getKitchenAreas();
    this.setState({ kitchenAreas, categories, foods});
    this.intervalId = setInterval(this.updateClock.bind(this), 10000);
  }

  updateClock() {
    this.setState({
      time: new Date().toLocaleDateString()
    });
  }

  componentWillUnmount() {
    clearInterval(this.intervalId!);
  }

  async sendNewFood(food: Food) {
    const newFood = await KitchenAPIService.postNewFood(food);
    const newFoodArray = [...this.state.foods, newFood].sort((a, b) => new Date(a.expiry_date).getTime() - new Date(b.expiry_date).getTime());
    this.setState({foods: newFoodArray});
  }

  async updateFood(food: Food) {
    const updatedFood = await KitchenAPIService.updateFood(food);
    const updatedFoodArray = [...this.state.foods];
    const idx = updatedFoodArray.findIndex(f => f.id === updatedFood.id);
    updatedFoodArray[idx] = updatedFood;
    const newFoodArray = updatedFoodArray.sort((a, b) => new Date(a.expiry_date).getTime() - new Date(b.expiry_date).getTime());
    this.setState({foods: newFoodArray});
  }

  async deleteFood(food: Food) {
    const deletedFood = await KitchenAPIService.deleteFood(food);
    const updatedFoodArray = [...this.state.foods];
    const idx = updatedFoodArray.findIndex(f => f.id === deletedFood.id);
    updatedFoodArray.splice(idx, 1);
    this.setState({foods: updatedFoodArray});
  }

  render() {
    const kitchenComponents = this.state.kitchenAreas.map(area => {
      const areaFoods = this.state.foods.filter(food => food.kitchen_area === area.id);
      
      return <KitchenAreaComponent
              time={this.state.time}
              kitchenArea={area} 
              categories={this.state.categories} 
              foods={areaFoods}
              sendNewFood={this.sendNewFood.bind(this)}
              updateFood={this.updateFood.bind(this)}
              deleteFood={this.deleteFood.bind(this)}
              />
    })

    return (
      <KitchenAreasContainer>
        {kitchenComponents}
      </KitchenAreasContainer>
    );
  }
}

export default App;
 