import React from 'react';
import logo from './logo.svg';
import './App.css';
import KitchenAPIService from './services/apiService';
import KitchenArea from './models/KitchenArea';
import KitchenAreaComponent from './components/KitchenArea';
import Food from './models/Food';
import Category from './models/Category';

interface AppState {
  kitchenAreas: KitchenArea[];
  foods: Food[];
  categories: Category[];
}

class App extends React.Component<{}, AppState> {

  constructor(props) {
    super(props);
    this.state = {
      kitchenAreas: [],
      foods: [],
      categories: [],
    }
  }

  async componentDidMount() {
    const foods = await KitchenAPIService.getAllFood();
    const categories = await KitchenAPIService.getCategories();
    const kitchenAreas = await KitchenAPIService.getKitchenAreas();
    this.setState({ kitchenAreas, categories, foods});
  }

  render() {
    console.log(this.state.foods);
    const kitchenComponents = this.state.kitchenAreas.map(area => {
      const areaFoods = this.state.foods.filter(food => food.kitchen_area === area.id);
      
      return <KitchenAreaComponent kitchenArea={area} categories={this.state.categories} foods={areaFoods}></KitchenAreaComponent>
    })

    return (
      <div>
        {kitchenComponents}
      </div>
    );
  }
}

export default App;
 