import styles from "./feed-places.module.css";
import { PlacesInfo } from "../../components/place-info/places-info";

export function FeedPlaces () {
    return (
        <div className={styles.feed_places}>
            <h1>Список мест</h1>
            <form className={styles.searching_form}>
                <input type="text" placeholder="Search" />
                <select >
                    <option value="Италия">Италия</option>
                    <option value="Франция">Франция</option>
                    <option value="Япония">Япония</option>
                </select>
                <button type="submit">Search</button>
            </form>
            <PlacesInfo />
            <PlacesInfo />
            <PlacesInfo />
            <button className={styles.add_button}>+</button>
        </div>
    )
}
