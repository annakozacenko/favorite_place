import { CiLocationOn } from "react-icons/ci";
import styles from "./places-info.module.css";
import { RxCounterClockwiseClock } from "react-icons/rx";
interface PlacesInfoProps {
  title: string;
  location: string;
  visits: number;
  category: string;
}
export function PlacesInfo({
  title,
  location,
  visits = 0,
  category,
}: PlacesInfoProps) {
  return (
    <div className={styles.place_info}>
      <div className={styles.rating_info}>
        <img
          className={styles.rating_image}
          src="src/assets/cafe.jpg"
          alt="Home"
        />
        <div className={styles.rating_value}>
          <img className={styles.star} src="src/assets/star.svg" alt="Home" />
          <div className={styles.rating}>4.5</div>
        </div>
      </div>
      <div className={styles.text_info}>
        <div className={styles.title_info}>
          <div className={styles.title}>{title}</div>
          <div className={styles.category}>{category}</div>
        </div>
        <div className={styles.line}>
          <CiLocationOn
            style={{ fontSize: "14px", color: "black", strokeWidth: "1px" }}
          />
          <div className={styles.location}>{location}</div>
        </div>

        <div className={styles.line}>
          <RxCounterClockwiseClock
            style={{ fontSize: "14px", color: "black", strokeWidth: "0.05px" }}
          />
          <div className={styles.visits}>Посещено {visits} раз</div>
        </div>
      </div>
    </div>
  );
}
