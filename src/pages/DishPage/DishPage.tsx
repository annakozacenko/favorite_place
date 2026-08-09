import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { VisitInfo } from "../../components/VisitInfo/VisitInfo";
import { DishModal } from "../../components/DishModal/DishModal";
import {
  deleteDish,
  selectDishById,
} from "../../store/slices/dishesSlice";
import { selectPlaceById } from "../../store/slices/placesSlice";
import { selectVisits } from "../../store/slices/visitsSlice";
import { selectDishRatingFromVisits } from "../../store/selectors";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import styles from "./DishPage.module.css";

export function DishPage() {
  const { id } = useParams();
  const dishId = Number(id);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isEditOpen, setIsEditOpen] = useState(false);

  const dish = useAppSelector((state) => selectDishById(state, dishId));
  const place = useAppSelector((state) =>
    dish ? selectPlaceById(state, dish.placeId) : null
  );
  const rating = useAppSelector((state) =>
    selectDishRatingFromVisits(state, dishId)
  );
  const allVisits = useAppSelector(selectVisits);

  const dishVisits = useMemo(
    () =>
      allVisits.filter((visit) =>
        visit.dishes.some((visitDish) => visitDish.id === dishId)
      ),
    [allVisits, dishId]
  );

  if (!dish) {
    return <div className={styles.main}>Блюдо не найдено</div>;
  }

  const handleDelete = () => {
    const confirmed = window.confirm(
      `Удалить блюдо «${dish.name}» из каталога? История в прошлых визитах сохранится.`
    );
    if (!confirmed) return;

    const placeId = dish.placeId;
    dispatch(deleteDish(dish.id));
    navigate(`/place/${placeId}`);
  };

  return (
    <div className={styles.main}>
      <div className={styles.headerRow}>
        <div>
          <h1 className={styles.title}>{dish.name}</h1>
          {place && <p className={styles.text}>в {place.name}</p>}
          <div>★ {rating}</div>
        </div>
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

      <div>Визиты:</div>
      <ul className={styles.visits}>
        {dishVisits.length === 0 ? (
          <li className={styles.text}>Пока нет визитов с этим блюдом</li>
        ) : (
          dishVisits.map((visit, index) => {
            const visitDish = visit.dishes.find((d) => d.id === dishId);
            return (
              <VisitInfo
                key={visit.id}
                visitId={visit.id}
                index={index + 1}
                date={visit.date}
                rating={visitDish?.visitRating ?? visit.rating}
              />
            );
          })
        )}
      </ul>

      <DishModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        placeId={dish.placeId}
        dish={dish}
      />
    </div>
  );
}
