import '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import logo from './logo.svg';
import './App.css';
import AppHeader from "./components/AppHeader";
import BurgerConstructor from "./components/BurgerConstructor";
import BurgerIngredients from "./components/BurgerIngredients";

function App() {
  return (
    <div className="App">
      <AppHeader />
      <BurgerConstructor />
      <BurgerIngredients />
    </div>
  );
}

export default App;
