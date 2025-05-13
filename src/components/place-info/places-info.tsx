import styles from "./places-info.module.css";
interface PlacesInfoProps {
  title: string;
  location: string;
  visits: number;
}
export function PlacesInfo({ title, location, visits = 0 }: PlacesInfoProps) {
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
        <div className={styles.title}>{title}</div>
        <div className={styles.location}>{location}</div>
        <div className={styles.visits}>{visits} раз</div>
      </div>
    </div>
  );
}
