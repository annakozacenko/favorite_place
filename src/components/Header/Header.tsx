import styles from "./Header.module.css";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { MapPin, Plus, Heart } from "lucide-react";

export const AppHeader = () => {
  return (
    <nav className={styles.menu} aria-label="Основная навигация">
      <NavLink
        to="/"
        className={({ isActive }) =>
          clsx(styles.menuItem, { [styles.active]: isActive })
        }
        end
      >
        <MapPin size={22} strokeWidth={1.75} />
        <span className={styles.navTitle}>Места</span>
      </NavLink>
      <NavLink
        to="/new-visit"
        className={({ isActive }) =>
          clsx(styles.menuItem, styles.menuItemAccent, {
            [styles.active]: isActive,
          })
        }
      >
        <Plus size={24} strokeWidth={2} />
        <span className={styles.navTitle}>Визит</span>
      </NavLink>
      <NavLink
        to="/profile"
        className={({ isActive }) =>
          clsx(styles.menuItem, { [styles.active]: isActive })
        }
      >
        <Heart size={22} strokeWidth={1.75} />
        <span className={styles.navTitle}>Избранное</span>
      </NavLink>
    </nav>
  );
};
