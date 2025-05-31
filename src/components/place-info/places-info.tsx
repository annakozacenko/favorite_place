import styles from "./places-info.module.css";
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
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
        <div className={styles.location}>{location}</div>
        </div>

        <div className={styles.line}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path><path d="M12 7v5l4 2"></path></svg>
        <div className={styles.visits}>Посещено {visits} раз</div>
        </div>

      </div>
    </div>
  );
}
