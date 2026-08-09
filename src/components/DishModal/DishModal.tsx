import { useEffect, useState } from "react";
import { X } from "lucide-react";
import styles from "./DishModal.module.css";
import { useAppDispatch } from "../../store/hooks";
import { addDish, updateDish, TDish } from "../../store/slices/dishesSlice";

type DishModalProps = {
  isOpen: boolean;
  onClose: () => void;
  placeId: number;
  dish?: TDish | null;
};

export function DishModal({
  isOpen,
  onClose,
  placeId,
  dish = null,
}: DishModalProps) {
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");
  const isEdit = Boolean(dish);

  useEffect(() => {
    if (!isOpen) return;
    setName(dish?.name ?? "");
  }, [isOpen, dish]);

  if (!isOpen) return null;

  const resetForm = () => setName("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (dish) {
      dispatch(updateDish({ id: dish.id, name: name.trim() }));
    } else {
      dispatch(
        addDish({
          name: name.trim(),
          placeId,
        })
      );
    }

    resetForm();
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="dish-modal-title">
        <div className={styles.header}>
          <h2 id="dish-modal-title" className={styles.title}>
            {isEdit ? "Редактировать блюдо" : "Добавить блюдо"}
          </h2>
          <button onClick={onClose} className={styles.closeButton} aria-label="Закрыть окно">
            <X size={20} />
          </button>
        </div>

        <div className={styles.content}>
          <form className={styles.form} onSubmit={handleSubmit}>
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
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className={styles.footer}>
              <button
                type="button"
                onClick={onClose}
                className={styles.buttonSecondary}
                aria-label="Отменить и закрыть"
              >
                Отменить
              </button>
              <button type="submit" className={styles.buttonPrimary}>
                {isEdit ? "Сохранить" : "Добавить"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
