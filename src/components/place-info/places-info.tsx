import { CiLocationOn } from "react-icons/ci";
import styles from "./places-info.module.css";
import { RxCounterClockwiseClock } from "react-icons/rx";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import {
  selectFavoritePlaceIds,
  selectPlace,
  toggleFavoritePlace,
  TPlace,
} from "../../store/slices/placesSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export function PlacesInfo({
  id,
  name,
  location,
  visits = 0,
  category,
  rating,
}: TPlace) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //? мне не нравится такая логика. Она приведет к множественным перерендерам всех карточек при добавлении карточки в избранное
  const favoritePlacesIds = useSelector(selectFavoritePlaceIds);
  const isFavorite = favoritePlacesIds.includes(id);

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(
      toggleFavoritePlace({
        id,
        name,
        location,
        visits,
        category,
        rating,
      })
    );
  };

  const handlePlaceClick = () => {
    navigate(`/place/${id}`);
    dispatch(
      selectPlace({
        id,
        name,
        location,
        visits,
        category,
        rating,
      })
    );
  };
  return (
    <div className={styles.place_info} onClick={handlePlaceClick}>
      <div className={styles.rating_info}>
        <img
          className={styles.rating_image}
          src="src/assets/cafe.jpg"
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
