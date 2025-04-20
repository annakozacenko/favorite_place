import styles from "./dish-info.module.css";
import clsx from "clsx";

export function DishInfo () {
  return (
    <div className={styles.main}>
      <div className={styles.title}>Том ям</div>
      <div className={styles.rating}>
        <span>★</span>
        <span>4 stars</span>
      </div>
      <div className={styles.visits}>5 раз</div>
      <div className={styles.comment}>Очень вкусно!</div>
    </div>
  );
};
