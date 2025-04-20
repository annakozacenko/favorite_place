import { VisitInfo } from "../../components/visit-info/visit-info";
import styles from "./dish.module.css";
import clsx from "clsx";

export function Dish () {
  return (
    <div className={styles.main}>
      <h1 className={styles.title}>Том ям</h1>
      <p className={styles.text}>в Chang</p>
      <div>4 stars</div>
      <div>Визиты:</div>
      <ul className={styles.visits}>
        <VisitInfo />
        <VisitInfo />
        <VisitInfo />
        <VisitInfo />
      </ul>

   

    </div>
  );
};
