import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './app-header.module.css';

function AppHeader ({ activeMenuItemId, setActiveMenuItemId }) {
  const [menuItems, setMenuItems] = React.useState([
    { id: 0, name: 'Конструктор', isActive: false },
    { id: 1, name: 'Лента заказов', isActive: false }
  ]);

  return (
    <header className={styles.menu}>
      <ul className={styles.menu_items}>
        {menuItems.map((menuItem) => (
          <li
            key={menuItem.id}
            className={`${styles.menu_item} ${menuItem.id === activeMenuItemId ? styles.menu_item_active : ''}`}
            onClick={() => setActiveMenuItemId(menuItem.id)}
          >
            {menuItem.id === 0 ?
              <BurgerIcon type={menuItem.id === activeMenuItemId ? 'primary' : 'secondary'} /> :
              <ListIcon type={menuItem.id === activeMenuItemId ? 'primary' : 'secondary'} />
            }
            <span>{menuItem.name}</span>
          </li>
        ))}
      </ul>
      <Logo />
      <div className={styles.menu_profile}>
        <ProfileIcon type={'secondary'} />
        <span>Личный кабинет</span>
      </div>
    </header>
  );
}

AppHeader.propTypes = {
  activeMenuItemId: PropTypes.number.isRequired,
  setActiveMenuItemId: PropTypes.func.isRequired
};

export default AppHeader;
