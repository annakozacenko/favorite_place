import { DishInfo } from "../../components/dish-info/dish-info";
import { VisitInfo } from "../../components/visit-info/visit-info";
import styles from "./place.module.css";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {  RootState, selectSelectedPlace } from "../../store/slices/placesSlice";

export function Place() {
  //? ввела реакт роутер, но не знаю, как применить
  const { id } = useParams();
  //? как будто неправильная логика
  const place = useSelector(selectSelectedPlace);

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
          <VisitInfo />
          <VisitInfo />
          <VisitInfo />
          <VisitInfo />
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
          <DishInfo/>
          <DishInfo/>
          <DishInfo/>
        </ul>
      </div>
    </div>
  );
};
