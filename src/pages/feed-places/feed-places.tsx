import styles from "./feed-places.module.css";
import { PlacesInfo } from "../../components/place-info/places-info";
import { useSelector } from "react-redux";
import { selectPlaces } from "../../store/slices/placesSlice";


export function FeedPlaces() {
  const places = useSelector(selectPlaces)
  return (
    <div className={styles.feed_places}>
      <h1>Список мест</h1>
      <form className={styles.searching_form}>
        <input type="text" placeholder="Search" />
        <select>
          <option value="Италия">Италия</option>
          <option value="Франция">Франция</option>
          <option value="Япония">Япония</option>
        </select>
        <select>
          <option value="Италия">От А до Я</option>
          <option value="Франция">От Я до А</option>
          <option value="Япония">Высокая оценка</option>
          <option value="Япония">Низкая оценка</option>
          <option value="Япония">Недавно посещенные</option>
        </select>
        <button type="submit">Search</button>
      </form>
      <div className={styles.cards}>
         {/* //? правильно здесь описывать "карточки" или "места" ? стили, перечисление и т.д */}
        {places.map((card, index) => {
            return (
          <PlacesInfo
            title={card.name}
            location={card.location}
            visits={card.visits}
            category={card.category}
          />)
        })}
      </div>
      <button className={styles.add_button}>+</button>
    </div>
  );
}
