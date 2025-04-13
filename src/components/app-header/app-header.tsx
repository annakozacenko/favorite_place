import styles from './app-header.module.css';
import clsx from 'clsx';

export const AppHeader = () => {
    return (
        <nav className={styles.menu}>
            <div className={styles.menuItem}>
                <img className={styles.icon} src="src/assets/add_Figr_Icon.svg" alt="Home" />
                <div className={styles.navTitle}>Home</div>
            </div>
            <div className={styles.menuItem}>
                <img className={styles.icon} src="src/assets/add_Figr_Icon.svg" alt="Favorites" />
                <div className={styles.navTitle}>Favorites</div>
            </div>
            <div className={styles.menuItem}>
                <img className={styles.icon} src="src/assets/add_Figr_Icon.svg" alt="Profile" />
                <div className={styles.navTitle}>Profile</div>
            </div>
        </nav>
    )
}