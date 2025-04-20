import { DishInfo } from "../../components/dish-info/dish-info";
import { VisitInfo } from "../../components/visit-info/visit-info";
import styles from "./place.module.css";

export function Place () {
  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <h1 className={styles.title}>Chang</h1>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>
          <h2>Визиты</h2>
          <button className={styles.addButton}>
            <img src="src/assets/add-icon.svg" alt="+" />
            Добавить визит
          </button>
        </div>
        <ul className={styles.visits}>
          <VisitInfo />
          <VisitInfo />
          <VisitInfo />
          <VisitInfo />
        </ul>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>
          <h2>Блюда</h2>
          <button className={styles.addButton}>
            <img src="src/assets/add-icon.svg" alt="+" />
            Добавить блюдо
          </button>
        </div>
        <ul className={styles.dishes}>
          <DishInfo/>
          <DishInfo/>
          <DishInfo/>
        </ul>
      </div>
    </div>
  );
};
