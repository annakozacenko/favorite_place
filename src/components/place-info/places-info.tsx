import styles from "./places-info.module.css";
export function PlacesInfo() {
  return (
    <div className={styles.place_info}>
      <div className={styles.rating_info}>
        <div className={styles.rating_image}>+</div>
        <div className={styles.rating_value}>5</div>
      </div>
      <div style={{ flex: 1 }}>
        <div className={styles.title}>Chang</div>
        <div className={styles.location}>Chang</div>
      </div>
      <div className={styles.visits}>5</div>
    </div>
  );
}
