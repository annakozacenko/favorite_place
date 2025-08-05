import { X, MapPin } from "lucide-react";
import styles from "./RestaurantModal.module.css";
import { categoriesMocks } from "../../mocks/placesMocks";
import { useDispatch } from "react-redux";
import { addPlace } from "../../store/slices/placesSlice";
import { useState } from "react";

type RestaurantModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const RestaurantModal = ({ isOpen, onClose }: RestaurantModalProps) => {
  const dispatch = useDispatch();
const handleAddRestaurant = () => {
  dispatch(addPlace(
    {
      name,
      category,
      location,
      notes
    }
  ));
}

const [name, setName] = useState('');
const [category, setCategory] = useState('');
const [location, setLocation] = useState('');
const [notes, setNotes] = useState('');

  if (!isOpen) return null;
  
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>Добавить новое место</h2>
          <button onClick={onClose} className={styles.closeButton}>
            <X size={20} />
          </button>
        </div>

        <div className={styles.content}>
          <form className={styles.form}>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="restaurant-name">
                Название*
              </label>
              <input
                type="text"
                id="restaurant-name"
                required
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="cuisine">
                Кухня*
              </label>
              <select required className={styles.select}>
          {categoriesMocks.map((category) => {
            return <option value={category}>{category}</option>
          })}
        </select>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="location">
                Адрес
              </label>
              <div className={styles.inputGroup}>
                <div className={styles.iconWrapper}>
                  <MapPin size={18} />
                </div>
                <input
                  type="text"
                  id="location"
                  placeholder="Адрес"
                  className={styles.inputWithIcon}
                />
              </div>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="restaurant-notes">
                Заметки
              </label>
              <textarea
                id="restaurant-notes"
                placeholder="Добавьте рекомендации или дополнительную информацию..."
                className={styles.textarea}
              ></textarea>
            </div>
            <div className={styles.footer}> 
              <button type="submit" className={styles.buttonPrimary} onSubmit={handleAddRestaurant}>
                Добавить
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
