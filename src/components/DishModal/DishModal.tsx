import { X } from "lucide-react";
import styles from "./DishModal.module.css";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { addDish } from "../../store/slices/dishesSlice";

type DishModalProps = {
  isOpen: boolean;
  onClose: () => void;
  placeId: number;
};

export function DishModal({ isOpen, onClose, placeId }: DishModalProps) {
  if (!isOpen) return null;

  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      addDish({
        name,
        placeId,
      })
    );
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>Добавить блюдо</h2>
          <button onClick={onClose} className={styles.closeButton}>
            <X size={20} />
          </button>
        </div>

        <div className={styles.content}>
          <form className={styles.form}>
            {/* Название */}
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="dish-name">
                Название*
              </label>
              <input
                type="text"
                id="dish-name"
                required
                className={styles.input}
                placeholder="Введите название блюда"
              />
            </div>

            <div className={styles.footer}>
              <button
                type="button"
                onClick={onClose}
                className={styles.buttonSecondary}
              >
                Отменить
              </button>
              <button type="submit" className={styles.buttonPrimary}>
                Добавить
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
