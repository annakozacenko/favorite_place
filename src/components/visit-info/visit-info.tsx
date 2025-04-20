import styles from "./visit-info.module.css";
import clsx from "clsx";

export function VisitInfo() {
  return (
    <li className={styles.date_block}>
      <div className={styles.number}>1</div>
      <div className={styles.date}>11.04.2025</div>
      <div className={styles.rating}>
        <span>★</span>
        <span>5</span>
      </div>
    </li>
  );
}
