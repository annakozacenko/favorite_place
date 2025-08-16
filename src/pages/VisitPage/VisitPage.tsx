import { DishInfo } from "../../components/DishInfo/DishInfo";
import styles from "./VisitPage.module.css";

export function VisitPage () {
  return (
    <div className={styles.main}>
      <h1 className={styles.title}>Визит 05.02.2023</h1>
      
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Комментарий</h2>
        <div className={styles.comment}>
          <p className={styles.text}>Мне очень понравилось</p>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Блюда</h2>
        <ul className={styles.dishes}>
          <DishInfo/>
          <DishInfo/>
          <DishInfo/>
        </ul>
      </div>
    </div>
  );
};
