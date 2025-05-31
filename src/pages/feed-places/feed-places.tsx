import styles from "./feed-places.module.css";
import { PlacesInfo } from "../../components/place-info/places-info";

const cards = [
  { title: "Chang", location: "Naberezh", visits: 5 , category: 'итальянская'},
  { title: "Pastabar", location: "Naberezh", visits: 5 , category: 'французская'},
  { title: "Shava", location: "Naberezh", visits: 5 , category: 'японская'},
  { title: "Phali", location: "Naberezh", visits: 5, category: 'итальянская'},
  { title: "Teremok", location: "Naberezh", visits: 5, category: 'французская'},
];

export function FeedPlaces() {
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
        {cards.map((card, index) => {
            return (
          <PlacesInfo
            title={card.title}
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
