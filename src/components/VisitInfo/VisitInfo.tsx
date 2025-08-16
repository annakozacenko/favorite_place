import styles from "./VisitInfo.module.css";
import clsx from "clsx";

type VisitInfoProps = {
  index: number;
  date: string;
  rating: number;
};

export function VisitInfo({ index, date, rating }: VisitInfoProps) {
  return (
    <li className={styles.date_block}>
      <div className={styles.number}>{index}</div>
      <div className={styles.date}>{date}</div>
      <div className={styles.rating}>
        <span>★</span>
        <div>{rating}</div>
      </div>
    </li>
  );
}
