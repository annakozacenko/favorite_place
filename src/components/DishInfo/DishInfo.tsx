import { useSelector } from "react-redux";
import { selectDishOrderCountByPlace } from "../../store/slices/dishesSlice";
import styles from "./DishInfo.module.css";
import clsx from "clsx";


interface DishInfoProps {
  name: string;
  rating: number;
  placeId: string;
  dishId: string;
}

export function DishInfo ({ name, rating, placeId, dishId }: DishInfoProps) {
const timesOrderedCount = useSelector((state) =>
  selectDishOrderCountByPlace(state, Number(placeId), Number(dishId))
);

  return (
    <div className={styles.main}>
      <div className={styles.title}>{name}</div>
      <div className={styles.rating}>
        <span>★</span>
        <span>{rating} stars</span>
      </div>
      <div className={styles.visits}>{timesOrderedCount} раз</div>
    </div>
  );
};
