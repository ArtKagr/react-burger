import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './appheader.module.css';

function AppHeader ({ activeMenuItemId, setActiveMenuItemId }) {
    const [menuItems, setMenuItems] = React.useState([
        { id: 0, name: 'Конструктор', isActive: false },
        { id: 1, name: 'Лента заказов', isActive: false }
    ]);

    return (
        <div className={styles.menu}>
            <div className={styles.menu_items}>
                {menuItems.map((menuItem) => (
                    <div
                        key={menuItem.id}
                        className={`${styles.menu_item} ${menuItem.id === activeMenuItemId ? styles.menu_item_active : ''}`}
                        onClick={() => setActiveMenuItemId(menuItem.id)}
                    >
                        {menuItem.id === 0 ?
                            <BurgerIcon type={menuItem.id === activeMenuItemId ? 'primary' : 'secondary'} /> :
                            <ListIcon type={menuItem.id === activeMenuItemId ? 'primary' : 'secondary'} />
                        }
                        <span>{menuItem.name}</span>
                    </div>
                ))}
            </div>
            <Logo />
            <div className={styles.menu_profile}>
                <ProfileIcon type={'secondary'} />
                <span>Личный кабинет</span>
            </div>
        </div>
    );
}

AppHeader.propTypes = {
    activeMenuItemId: PropTypes.number,
    setActiveMenuItemId: PropTypes.func
}

export default AppHeader;
