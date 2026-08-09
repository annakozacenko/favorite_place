import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DishInfo } from "../../components/DishInfo/DishInfo";
import { VisitInfo } from "../../components/VisitInfo/VisitInfo";
import { RestaurantModal } from "../../components/RestaurantModal/RestaurantModal";
import styles from "./PlacePage.module.css";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  deleteDishesByPlaceId,
  selectDishesByPlaceId,
} from "../../store/slices/dishesSlice";
import {
  deleteVisitsByPlaceId,
  selectVisitsByPlaceId,
} from "../../store/slices/visitsSlice";
import { deletePlace, selectPlaceById } from "../../store/slices/placesSlice";
import { selectPlaceWithStats } from "../../store/selectors";

export function PlacePage() {
  const { id } = useParams();
  const placeId = Number(id);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isEditOpen, setIsEditOpen] = useState(false);

  const place = useAppSelector((state) => selectPlaceWithStats(state, placeId));
  const placeRaw = useAppSelector((state) => selectPlaceById(state, placeId));
  const dishes = useAppSelector((state) => selectDishesByPlaceId(state, placeId));
  const visits = useAppSelector((state) => selectVisitsByPlaceId(state, placeId));

  if (!place || !placeRaw) {
    return <div>Место не найдено</div>;
  }

  const handleDelete = () => {
    const confirmed = window.confirm(
      `Удалить «${place.name}» вместе с визитами и блюдами?`
    );
    if (!confirmed) return;

    dispatch(deleteVisitsByPlaceId(placeId));
    dispatch(deleteDishesByPlaceId(placeId));
    dispatch(deletePlace(placeId));
    navigate("/");
  };

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <h1 className={styles.title}>{place.name}</h1>
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.actionButton}
              onClick={() => setIsEditOpen(true)}
            >
              Изменить
            </button>
            <button
              type="button"
              className={styles.dangerButton}
              onClick={handleDelete}
            >
              Удалить
            </button>
          </div>
        </div>
        <p className={styles.meta}>
          {place.category} · ★ {place.rating} · {place.visits}{" "}
          {place.visits === 1 ? "визит" : "визитов"}
        </p>
        {place.location && <p className={styles.meta}>{place.location}</p>}
        {place.notes && <p className={styles.notes}>{place.notes}</p>}
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>
          <h2>Визиты</h2>
        </div>
        {visits.length === 0 ? (
          <p className={styles.empty}>Визитов пока нет</p>
        ) : (
          <ul className={styles.visits}>
            {visits.map((visit, index) => (
              <VisitInfo
                key={visit.id}
                visitId={visit.id}
                date={visit.date}
                rating={visit.rating}
                index={index + 1}
              />
            ))}
          </ul>
        )}
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>
          <h2>Блюда</h2>
        </div>
        {dishes.length === 0 ? (
          <p className={styles.empty}>Блюд пока нет</p>
        ) : (
          <ul className={styles.dishes}>
            {dishes.map((dish) => (
              <li key={dish.id}>
                <DishInfo
                  name={dish.name}
                  placeId={id ?? ""}
                  dishId={dish.id.toString()}
                />
              </li>
            ))}
          </ul>
        )}
      </div>

      <RestaurantModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        place={placeRaw}
      />
    </div>
  );
}
