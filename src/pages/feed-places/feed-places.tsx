import styles from "./feed-places.module.css";
import { PlacesInfo } from "../../components/place-info/places-info";
import { useDispatch, useSelector } from "react-redux";
import {  searchPlacesByName, selectProcessedPlaces, sortPlaces, filterPlacesByCategory } from "../../store/slices/placesSlice";
import { FaRegTrashAlt } from "react-icons/fa";
import { categoriesMocks } from "../../mocks/mocks";



export function FeedPlaces() {
    const dispatch = useDispatch();
  const places = useSelector(selectProcessedPlaces)
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(searchPlacesByName(e.target.value));
  };
  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(sortPlaces(e.target.value));
  }

  const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(filterPlacesByCategory(e.target.value));
  }
  return (
    <div className={styles.feed_places}>
      <h1>Список мест</h1>
      <form className={styles.searching_form}>
        <input type="text" placeholder="Поиск" onInput={handleSearch}/>
        <select onChange={handleFilter}>
          <option value="">Все категории</option>
          {categoriesMocks.map((category, index) => {
            return <option key ={index} value={category}>{category}</option>
          })}
        </select>
        <select onChange={handleSort}>
          <option value="visitsHigh">Часто посещаемые</option>
          <option value="visitsLow">Редко посещаемые</option> 
          <option value="ratingHigh">Высокая оценка</option>
          <option value="ratingLow">Низкая оценка</option>
        </select>
        <button type="submit">
          <FaRegTrashAlt />
        </button>
      </form>
      <div className={styles.cards}>
        {places.map((card, index) => {
            return (
          <PlacesInfo
                key={index}
                id={card.id}
                name={card.name}
                location={card.location}
                visits={card.visits}
                category={card.category}
                rating={card.rating} notes={""}          />)
        })}
      </div>
      <button className={styles.add_button}>+</button>
    </div>
  );
}
