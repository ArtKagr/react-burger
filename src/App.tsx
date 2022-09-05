import '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import './App.css';
import AppHeader from "./components/AppHeader";
import BurgerConstructor from "./components/BurgerConstructor";
import BurgerIngredients from "./components/BurgerIngredients";
import Modal from "./components/Modal";

function App() {
  const [activeMenuItemId, setActiveMenuItemId] = React.useState(0);
  const [ingredients, setIngredients] = React.useState([]);
  const [activeIngredient, setActiveIngredient] = React.useState({});
  const [activeTab, setActiveTab] = React.useState({ id: 0, name: 'Булки' });
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalSource, setModalSource] = React.useState(null);

  React.useEffect(() => {
      fetch('https://norma.nomoreparties.space/api/ingredients ')
          .then(res => res.json())
          .then(data => setIngredients(data.data))
          .catch(error => console.warn(error))
  }, [])

  document.addEventListener('keydown', (e) => {
     if (modalVisible && e.key === 'Escape') {
         setModalVisible(false);
     }
  })

  return (
    <div className={`App ${modalVisible ? 'scroll_hidden' : ''}`}>
      <AppHeader activeMenuItemId={activeMenuItemId} setActiveMenuItemId={setActiveMenuItemId} />
      <div className="App-container">
         <BurgerIngredients
             ingredients={ingredients}
             activeTab={activeTab}
             setActiveTab={setActiveTab}
             setModalVisible={setModalVisible}
             setModalSource={setModalSource}
             setActiveIngredient={setActiveIngredient}
         />
         <BurgerConstructor
             ingredients={ingredients}
             setModalVisible={setModalVisible}
             setModalSource={setModalSource}
         />
      </div>
        <div style={{overflow: 'hidden'}}>{
            modalVisible && <Modal source={modalSource} activeIngredient={activeIngredient} setModalVisible={setModalVisible}></Modal>}</div>
    </div>
  );
}

export default App;
