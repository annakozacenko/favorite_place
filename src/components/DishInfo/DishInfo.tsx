import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import {
  selectDishOrderCountByPlace,
} from "../../store/slices/dishesSlice";
import { selectDishRatingFromVisits } from "../../store/selectors";
import styles from "./DishInfo.module.css";

interface DishInfoProps {
  name: string;
  placeId: string;
  dishId: string;
}

export function DishInfo({ name, placeId, dishId }: DishInfoProps) {
  const navigate = useNavigate();
  const numericPlaceId = Number(placeId);
  const numericDishId = Number(dishId);

  const timesOrderedCount = useAppSelector((state) =>
    selectDishOrderCountByPlace(state, numericPlaceId, numericDishId)
  );
  const rating = useAppSelector((state) =>
    selectDishRatingFromVisits(state, numericDishId)
  );

  const handleClick = () => {
    navigate(`/dish/${dishId}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      className={styles.main}
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <div className={styles.title}>{name}</div>
      <div className={styles.rating}>
        <span>★</span>
        <span>{rating}</span>
      </div>
      <div className={styles.visits}>{timesOrderedCount} раз</div>
    </div>
  );
}
