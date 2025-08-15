import { useState } from "react";
import { RestaurantModal } from "../../components/restaurant/RestaurantModal";
import { DishModal } from "../../components/dish/DishModal";
import { StarRating } from "../../components/ui/StarRating";
import {
  Search,
  Plus,
  Camera,
  MapPin,
  Clock,
  Calendar,
  Users,
  DollarSign,
  Star,
} from "lucide-react";
import styles from "./form-new-visit.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectPlaces } from "../../store/slices/placesSlice";
import { selectDishesByPlaceId } from "../../store/slices/dishesSlice";
import { FaRegTrashCan } from "react-icons/fa6";
import { addVisit } from "../../store/slices/visitsSlice";

export type TSelectedDish = {
  id: number;
  name: string;
  placeId: number;
  rating: number;
  visitNotes: string;
  visitRating: number;
};

export function FormOfNewVisitPage() {
  const dispatch = useDispatch();

  const [isRestaurantModalOpen, setIsRestaurantModalOpen] = useState(false);
  const [isDishModalOpen, setIsDishModalOpen] = useState(false);
  const [selectedDishes, setSelectedDishes] = useState<TSelectedDish[]>([]);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<
    number | null
  >(null);

  const [notes, setNotes] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [companions, setCompanions] = useState("");
  const [overallRating, setOverallRating] = useState(0);

  const restaurants = useSelector(selectPlaces);
  // Получаем блюда только для выбранного ресторана
  const dishes = useSelector((state) =>
    selectedRestaurantId !== null
      ? selectDishesByPlaceId(state, selectedRestaurantId)
      : []
  );

  // Обработчик выбора блюда
  const handleDishSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const dishId = Number(e.target.value);
    const selectedDish = dishes.find((dish) => dish.id === dishId);
    if (selectedDish && !selectedDishes.some((dish) => dish.id === dishId)) {
      setSelectedDishes([
        ...selectedDishes,
        { ...selectedDish, visitNotes: "", visitRating: 0 },
      ]);
    }
    e.target.value = ""; // Сбросить выбор
  };

  // Обработчик удаления блюда
  const handleRemoveDish = (dishId: number) => {
    setSelectedDishes(selectedDishes.filter((dish) => dish.id !== dishId));
  };

  // Обработчик изменения рейтинга для блюда
const handleDishRatingChange = (dishId: number, rating: number) => {
  setSelectedDishes((prevDishes) => {
    const updatedDishes = prevDishes.map((dish) =>
      dish.id === dishId ? { ...dish, visitRating: rating } : dish
    );
    const sum = updatedDishes.reduce((acc, dish) => acc + dish.visitRating, 0);
    const average = updatedDishes.length > 0 ? sum / updatedDishes.length : 0;
    setOverallRating(average);
    return updatedDishes;
  });
};

  // Обработчик изменения заметок для блюда
  const handleDishNotesChange = (dishId: number, notes: string) => {
    setSelectedDishes(
      selectedDishes.map((dish) =>
        dish.id === dishId ? { ...dish, visitNotes: notes } : dish
      )
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedRestaurantId === null) return;
    dispatch(
      addVisit({
        placeId: selectedRestaurantId,
        date: date,
        companions: companions,
        rating: overallRating,
        notes: notes,
        dishes: selectedDishes,
      })
    );
    // Сброс формы
    setSelectedRestaurantId(null);
    setSelectedDishes([]);
    setNotes("");
    setDate("");
    setCompanions("");
    setOverallRating(0);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Добавить визит</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        {/* Выбор ресторана */}
        <div className={styles.card}>
          <h2 className={styles.sectionTitle}>Ресторан</h2>

          <div className={styles.searchInputWrapper}>
            <div className={styles.searchIcon}>
              <Search size={18} />
            </div>
            <select
              value={selectedRestaurantId ?? ""}
              onChange={(e) => {
                const value = e.target.value;
                setSelectedRestaurantId(value ? Number(value) : null);
                setSelectedDishes([]);
              }}
              className={styles.select}
            >
              <option value="">Выберите ресторан</option>
              {restaurants.map((restaurant, index) => (
                <option key={index} value={restaurant.id}>
                  {restaurant.name} ({restaurant.category})
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={() => setIsRestaurantModalOpen(true)}
            className={styles.buttonSecondary}
          >
            <Plus size={18} />
            Добавить новый ресторан
          </button>
        </div>

        {/* Детали визита */}
        <div className={styles.card}>
          <h2 className={styles.sectionTitle}>Детали визита</h2>

          <div className={styles.grid}>
            {/* Дата */}
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="visit-date">
                Дата
              </label>
              <div className={styles.searchInputWrapper}>
                <div className={styles.searchIcon}>
                  <Calendar size={18} />
                </div>
                <input
                  type="date"
                  id="visit-date"
                  className={styles.input}
                  onChange={(e) => setDate(e.target.value)}
                  value={date}
                />
              </div>
            </div>

            {/* Компаньоны */}
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="companions">
                Компаньоны
              </label>
              <div className={styles.searchInputWrapper}>
                <div className={styles.searchIcon}>
                  <Users size={18} />
                </div>
                <input
                  type="text"
                  id="companions"
                  placeholder="Один, с партнером, с друзьями..."
                  className={styles.input}
                  onChange={(e) => setCompanions(e.target.value)}
                  value={companions}
                />
              </div>
            </div>
          </div>

          {/* Overall Rating */}
          {/* <div className={styles.formGroup}>
            <label className={styles.label}>Overall Rating</label>
            <StarRating size={24} />
          </div> */}

          {/* Заметки */}
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="visit-notes">
              Заметки
            </label>
            <textarea
              id="visit-notes"
              placeholder="Добавить заметки..."
              className={styles.textarea}
              onChange={(e) => setNotes(e.target.value)}
              value={notes}
            ></textarea>
          </div>
        </div>

        {/* Выбор блюд */}
        <div className={styles.card}>
          <h2 className={styles.sectionTitle}>Блюда</h2>
          <div className={styles.totalRating}>
            <span>Общая оценка: {overallRating}</span>
          </div>
          <div className={styles.form}>
            {/* Список выбранных блюд */}
            {selectedDishes.map((dish, index) => (
              <div key={index} className={styles.dishItem}>
                <div className={styles.dishHeader}>
                  <div>
                    <h3 className={styles.dishTitle}>{dish.name}</h3>
                    <StarRating
                      initialRating={dish.visitRating || 0}
                      size={18}
                      onChange={(rating) =>
                        handleDishRatingChange(dish.id, rating)
                      }
                    />
                  </div>
                  <button
                    type="button"
                    className={styles.deleteButton}
                    onClick={() => handleRemoveDish(dish.id)}
                  >
                    <FaRegTrashCan size={18} />
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Заметки о блюде..."
                  className={styles.input}
                  value={dish.visitNotes || ""}
                  onChange={(e) =>
                    handleDishNotesChange(dish.id, e.target.value)
                  }
                  aria-label={`Заметки для блюда ${dish.name}`}
                />
              </div>
            ))}
          </div>

          {/* Добавление блюда */}
          <div className={styles.form}>
            <div className={styles.searchInputWrapper}>
              <div className={styles.searchIcon}>
                <Search size={18} />
              </div>
              <select
                className={styles.select}
                disabled={selectedRestaurantId === null}
                defaultValue=""
                onChange={handleDishSelect}
                aria-label="Выбор блюда"
              >
                <option value="" disabled>
                  {selectedRestaurantId === null
                    ? "Сначала выберите ресторан"
                    : "Выберите блюдо"}
                </option>
                {dishes.map((dish, index) => (
                  <option key={index} value={dish.id}>
                    {dish.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={() => setIsDishModalOpen(true)}
              className={styles.buttonSecondary}
              disabled={selectedRestaurantId === null}
              aria-label="Добавить новое блюдо"
            >
              <Plus size={18} />
              Добавить новое блюдо
            </button>
          </div>
        </div>

{/* пока что отключено, т.к. негде хранить фото */}
        {/* Фотографии */}
        {/* <div className={styles.card}>
          <h2 className={styles.sectionTitle}>Фотографии</h2>

          <div className={styles.photoGrid}>
            <div className={styles.photoItem}>
              <img
                src="https://images.pexels.com/photos/1579739/pexels-photo-1579739.jpeg"
                alt="Food"
                className={styles.photoImage}
              />
            </div>
          </div>

          <button type="button" className={styles.buttonSecondary}>
            <Camera size={18} />
            Добавить фото
          </button>
        </div> */}

        {/* Кнопка сохранения */}
        <button type="submit" className={styles.buttonPrimary}>
          Сохранить визит
        </button>
      </form>

      {/* Модальные окна */}
      <RestaurantModal
        isOpen={isRestaurantModalOpen}
        onClose={() => setIsRestaurantModalOpen(false)}
      />

      <DishModal
        isOpen={isDishModalOpen}
        onClose={() => setIsDishModalOpen(false)}
        placeId={selectedRestaurantId || 0}
      />
    </div>
  );
}
