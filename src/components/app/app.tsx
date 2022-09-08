import '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import Modal from "../modal/modal";
import IngredientDetails from "../modal/components/ingredient-details/ingredient-details";
import OrderDetails from "../modal/components/order-details/order-details";
import styles from './app.module.css'

function App() {
  const [activeMenuItemId, setActiveMenuItemId] = React.useState(0);
  const [ingredients, setIngredients] = React.useState([]);
  const [activeIngredient, setActiveIngredient] = React.useState({});
  const [activeTab, setActiveTab] = React.useState({ id: 0, name: 'Булки', type: 'bun', items: [] });
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalSource, setModalSource] = React.useState('order');
  const [order, setOrder] = React.useState([
    '60d3b41abdacab0026a733c6',
    '60d3b41abdacab0026a733ce',
    '60d3b41abdacab0026a733c9',
    '60d3b41abdacab0026a733d1',
    '60d3b41abdacab0026a733d4',
    '60d3b41abdacab0026a733d0',
    '60d3b41abdacab0026a733d0'
  ]);

  const apiRequest = 'https://norma.nomoreparties.space/api/ingredients';

  React.useEffect(() => {
    fetch(apiRequest)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
      })
      .then(data => setIngredients(data.data))
      .catch(err => new Error(`Api request error: ${err}`))
  }, []);

  const closePopup = () => {
    setModalVisible(false);
  };

  return (
    <div className={styles.app}>
      <AppHeader activeMenuItemId={activeMenuItemId} setActiveMenuItemId={setActiveMenuItemId} />
      <main className={styles.app_container}>
        <BurgerIngredients
          ingredients={ingredients}
          order={order}
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
          order={order}
        />
      </main>
      {modalVisible &&
        <Modal closePopup={closePopup}>
          <>
            {modalSource === 'ingredient' && <IngredientDetails activeIngredient={activeIngredient} />}
            {modalSource === 'order' && <OrderDetails />}
          </>
        </Modal>}
    </div>
  );
}

export default App;
