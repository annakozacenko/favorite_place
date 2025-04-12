import styles from './app-header.module.css';
import clsx from 'clsx';
export const AppHeader = () => {
    return (
        <nav className={styles.menu}>
        <div className="menu-1">
          <img className="home-work-figr-icon" src="src/assets/add_Figr_Icon.svg" />
          <div className="nav-title2">Home</div>
        </div>
        <div className="menu-2">
          <img className="home-work-figr-icon2" src="src/assets/add_Figr_Icon.svg" />
          <div className="nav-title2">Favorites</div>
        </div>
        <div className="menu-3">
          <img className="home-work-figr-icon3" src="src/assets/add_Figr_Icon.svg" />
          <div className="nav-title3">Profile</div>
        </div>
        </nav>
    )
}