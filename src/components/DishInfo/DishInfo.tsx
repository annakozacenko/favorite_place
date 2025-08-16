import { useSelector } from "react-redux";
import { selectDishOrderCountByPlace, TDish } from "../../store/slices/dishesSlice";
import styles from "./DishInfo.module.css";
import clsx from "clsx";


export function DishInfo ({ name, rating, placeId, dishId}) {
const timesOrderedCount = useSelector((state) =>
  selectDishOrderCountByPlace(state, placeId, dishId)
);

  return (
    <div className={styles.main}>
      <div className={styles.title}>{name}</div>
      <div className={styles.rating}>
        <span>★</span>
        <span>{rating} stars</span>
      </div>
      <div className={styles.visits}>{timesOrderedCount} раз</div>
      {/* <div className={styles.comment}>{notes}</div> */}
    </div>
  );
};
