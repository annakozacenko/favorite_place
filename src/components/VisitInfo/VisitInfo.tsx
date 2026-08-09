import { useNavigate } from "react-router-dom";
import styles from "./VisitInfo.module.css";

type VisitInfoProps = {
  visitId: number;
  index: number;
  date: string;
  rating: number;
};

export function VisitInfo({ visitId, index, date, rating }: VisitInfoProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/visit/${visitId}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <li
      className={styles.date_block}
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <div className={styles.number}>{index}</div>
      <div className={styles.date}>{date || "без даты"}</div>
      <div className={styles.rating}>
        <span>★</span>
        <div>{rating}</div>
      </div>
    </li>
  );
}
