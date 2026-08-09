import styles from "./PlacesFeedPage.module.css";
import { PlacesInfo } from "../../components/PlacesInfo/PlacesInfo";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { clearFilters, searchPlacesByName, sortPlaces, filterPlacesByCategory } from "../../store/slices/placesSlice";
import { selectProcessedPlaces } from "../../store/selectors";
import { FaRegTrashAlt } from "react-icons/fa";
import { categoriesMocks } from "../../mocks/mocks";
import { RestaurantModal } from "../../components/RestaurantModal/RestaurantModal";
import { useState } from "react";



export function FeedPlaces() {
  const dispatch = useAppDispatch();
  const places = useAppSelector(selectProcessedPlaces);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(searchPlacesByName(e.target.value));
  };
  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(sortPlaces(e.target.value));
  }

  const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(filterPlacesByCategory(e.target.value));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  const [isRestaurantModalOpen, setIsRestaurantModalOpen] = useState(false);

  return (
    <div className={styles.feed_places}>
      <h1>Список мест</h1>
      <div className={styles.searching_form}>
        <input type="text" placeholder="Поиск" onInput={handleSearch} />
        <select onChange={handleFilter} defaultValue="">
          <option value="">Все категории</option>
          {categoriesMocks.map((category, index) => {
            return <option key={index} value={category}>{category}</option>
          })}
        </select>
        <select onChange={handleSort} defaultValue="visitsHigh">
          <option value="visitsHigh">Часто посещаемые</option>
          <option value="visitsLow">Редко посещаемые</option>
          <option value="ratingHigh">Высокая оценка</option>
          <option value="ratingLow">Низкая оценка</option>
        </select>
        <button
          type="button"
          onClick={handleClearFilters}
          aria-label="Сбросить фильтры"
        >
          <FaRegTrashAlt />
        </button>
      </div>
      <div className={styles.cards}>
        {places.map((card) => {
            return (
          <PlacesInfo
                key={card.id}
                id={card.id}
                name={card.name}
                location={card.location}
                visits={card.visits}
                category={card.category}
                rating={card.rating}
                notes={card.notes}
              />
            );
        })}
      </div>
      <button className={styles.add_button} onClick={() => setIsRestaurantModalOpen(true)}>+</button>
      {isRestaurantModalOpen && (
        <RestaurantModal onClose={() => setIsRestaurantModalOpen(false)} isOpen={isRestaurantModalOpen} />
      )}
    </div>
  );
}
