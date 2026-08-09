import { CiLocationOn } from "react-icons/ci";
import styles from "./PlacesInfo.module.css";
import { RxCounterClockwiseClock } from "react-icons/rx";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import {
  selectIsPlaceFavorite,
  selectPlace,
  toggleFavoritePlace,
  TPlace,
} from "../../store/slices/placesSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useNavigate } from "react-router-dom";
import placeImage from "../../assets/place.svg";

export function PlacesInfo({
  id,
  name,
  location,
  visits = 0,
  category,
  rating,
  notes,
}: TPlace) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const placeSnapshot: TPlace = { id, name, location, visits, category, rating, notes };

  const isFavorite = useAppSelector((state) => selectIsPlaceFavorite(state, id));

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleFavoritePlace(placeSnapshot));
  };

  const handlePlaceClick = () => {
    navigate(`/place/${id}`);
    dispatch(selectPlace(placeSnapshot));
  };
  return (
    <div className={styles.place_info} onClick={handlePlaceClick}>
      <div className={styles.rating_info}>
        <img
          className={styles.rating_image}
          src={placeImage}
          alt="cafe"
        />
        <div className={styles.rating_value}>
          <button className={styles.star_button} onClick={handleFavorite}>
            {isFavorite ? (
              <FaHeart style={{ color: "gold" }} />
            ) : (
              <FaRegHeart style={{ color: "gray" }} />
            )}
          </button>
          <div className={styles.rating}>{rating}</div>
        </div>
      </div>
      <div className={styles.text_info}>
        <div className={styles.title_info}>
          <div className={styles.title}>{name}</div>
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
