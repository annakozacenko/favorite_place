import { DishInfo } from "../../components/DishInfo/DishInfo";
import { VisitInfo } from "../../components/VisitInfo/VisitInfo";
import styles from "./PlacePage.module.css";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectPlaceById,
  selectSelectedPlace,
} from "../../store/slices/placesSlice";
import { selectDishesByPlaceId } from "../../store/slices/dishesSlice";
import { selectVisitsByPlaceId } from "../../store/slices/visitsSlice";

export function PlacePage() {
  const { id } = useParams();

  // const place= useSelector(selectSelectedPlace);
  //изменена логика поиска элемента. Теперь он ищется в сторе по айди
  const place = useSelector((state) => selectPlaceById(state, Number(id)));

  // Получаем блюда только для выбранного ресторана
  const dishes = useSelector((state) =>
    selectDishesByPlaceId(state, Number(id))
  );
  const visits = useSelector((state) =>
    selectVisitsByPlaceId(state, Number(id))
  );


  if (!place) {
    return <div>Место не найдено</div>;
  }

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <h1 className={styles.title}>{place.name}</h1>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>
          <h2>Визиты</h2>
          <button className={styles.addButton}>
            <img src="src/assets/add-icon.svg" alt="+" />
            Добавить визит
          </button>
        </div>
        <ul className={styles.visits}>
          {visits.map((visit, index) => (
            <VisitInfo
              key={visit.id}
              date={visit.date}
              rating={visit.rating}
              index={index + 1}
              
            />
          ))}
        </ul>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>
          <h2>Блюда</h2>
          <button className={styles.addButton}>
            <img src="src/assets/add-icon.svg" alt="+" />
            Добавить блюдо
          </button>
        </div>
        <ul className={styles.dishes}>
          {dishes.map((dish) => (
            <DishInfo
              key={dish.id}
              name={dish.name}
              rating={dish.rating}
               placeId={id}
               dishId={dish.id}            />
          ))}
        </ul>
      </div>
    </div>
  );
}
