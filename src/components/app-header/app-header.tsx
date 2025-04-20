import styles from './app-header.module.css';
import clsx from 'clsx';

export const AppHeader = () => {
    return (
        <nav className={styles.menu}>
            <div className={styles.menuItem}>
                <img className={styles.icon} src="src/assets/add_Figr_Icon.svg" alt="Home" />
                <div className={styles.navTitle}>Места</div>
            </div>
            <div className={styles.menuItem}>
                <img className={styles.icon} src="src/assets/add_Figr_Icon.svg" alt="Favorites" />
                <div className={styles.navTitle}>Визиты</div>
            </div>
            <div className={styles.menuItem}>
                <img className={styles.icon} src="src/assets/add_Figr_Icon.svg" alt="Profile" />
                <div className={styles.navTitle}>Профиль</div>
            </div>
        </nav>
    )
}