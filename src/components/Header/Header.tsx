import styles from './Header.module.css';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

export const AppHeader = () => {
    return (
        <nav className={styles.menu}>
            <NavLink 
                to="/" 
                className={({ isActive }) => clsx(styles.menuItem, { [styles.active]: isActive })}
                end
            >
                <img className={styles.icon} src="src/assets/add_Figr_Icon.svg" alt="Places" />
                <div className={styles.navTitle}>Места</div>
            </NavLink>
            <NavLink 
                to="/new-visit" 
                className={({ isActive }) => clsx(styles.menuItem, { [styles.active]: isActive })}
            >
                <img className={styles.icon} src="src/assets/add_Figr_Icon.svg" alt="New Visit" />
                <div className={styles.navTitle}>Новый визит</div>
            </NavLink>
            <NavLink 
                to="/profile" 
                className={({ isActive }) => clsx(styles.menuItem, { [styles.active]: isActive })}
            >
                <img className={styles.icon} src="src/assets/add_Figr_Icon.svg" alt="Profile" />
                <div className={styles.navTitle}>Профиль</div>
            </NavLink>
        </nav>
    )
}