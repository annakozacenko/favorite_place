import { useEffect, useState } from "react";
import { X, MapPin } from "lucide-react";
import styles from "./RestaurantModal.module.css";
import { categoriesMocks, TCategories } from "../../mocks/mocks";
import { useAppDispatch } from "../../store/hooks";
import { addPlace, updatePlace, TPlace } from "../../store/slices/placesSlice";

type RestaurantModalProps = {
  isOpen: boolean;
  onClose: () => void;
  place?: TPlace | null;
};

export const RestaurantModal = ({
  isOpen,
  onClose,
  place = null,
}: RestaurantModalProps) => {
  const dispatch = useAppDispatch();
  const isEdit = Boolean(place);

  const [name, setName] = useState("");
  const [category, setCategory] = useState<TCategories | "">("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    if (place) {
      setName(place.name);
      setCategory(place.category);
      setLocation(place.location);
      setNotes(place.notes);
    } else {
      setName("");
      setCategory("");
      setLocation("");
      setNotes("");
    }
  }, [isOpen, place]);

  const resetForm = () => {
    setName("");
    setCategory("");
    setLocation("");
    setNotes("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!category) return;

    if (place) {
      dispatch(
        updatePlace({
          id: place.id,
          name,
          category,
          location,
          notes,
        })
      );
    } else {
      dispatch(
        addPlace({
          name,
          category,
          location,
          notes,
        })
      );
    }

    onClose();
    resetForm();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            {isEdit ? "Редактировать место" : "Добавить новое место"}
          </h2>
          <button onClick={onClose} className={styles.closeButton}>
            <X size={20} />
          </button>
        </div>

        <div className={styles.content}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="restaurant-name">
                Название*
              </label>
              <input
                type="text"
                id="restaurant-name"
                required
                className={styles.input}
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="cuisine">
                Кухня*
              </label>
              <select
                required
                className={styles.select}
                onChange={(e) => setCategory(e.target.value as TCategories)}
                value={category}
              >
                <option value="" disabled>
                  Выберите категорию
                </option>
                {categoriesMocks.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
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
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
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
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
            <div className={styles.footer}>
              <button type="submit" className={styles.buttonPrimary}>
                {isEdit ? "Сохранить" : "Добавить"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
