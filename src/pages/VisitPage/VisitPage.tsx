import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { DishInfo } from "../../components/DishInfo/DishInfo";
import { VisitPhoto } from "../../components/VisitPhoto/VisitPhoto";
import {
  deleteVisit,
  selectVisitById,
  updateVisit,
} from "../../store/slices/visitsSlice";
import { selectPlaceById } from "../../store/slices/placesSlice";
import styles from "./VisitPage.module.css";

export function VisitPage() {
  const { id } = useParams();
  const visitId = Number(id);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const visit = useAppSelector((state) => selectVisitById(state, visitId));
  const place = useAppSelector((state) =>
    visit ? selectPlaceById(state, visit.placeId) : null
  );

  const [isEditing, setIsEditing] = useState(false);
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [companions, setCompanions] = useState("");

  useEffect(() => {
    if (!visit) return;
    setDate(visit.date);
    setNotes(visit.notes ?? "");
    setCompanions(
      Array.isArray(visit.companions) ? visit.companions.join(", ") : ""
    );
  }, [visit]);

  if (!visit) {
    return <div className={styles.main}>Визит не найден</div>;
  }

  const companionsText = Array.isArray(visit.companions)
    ? visit.companions.join(", ")
    : visit.companions;

  const parseCompanions = (value: string): string[] =>
    value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

  const handleSave = () => {
    if (!date) return;

    const companionsList = parseCompanions(companions);
    dispatch(
      updateVisit({
        id: visit.id,
        date,
        notes: notes || undefined,
        companions: companionsList.length > 0 ? companionsList : undefined,
        rating: visit.rating,
        dishes: visit.dishes,
        photos: visit.photos,
      })
    );
    setIsEditing(false);
  };

  const handleDelete = () => {
    const confirmed = window.confirm("Удалить этот визит?");
    if (!confirmed) return;

    const placeId = visit.placeId;
    dispatch(deleteVisit(visit.id));
    navigate(`/place/${placeId}`);
  };

  return (
    <div className={styles.main}>
      <div className={styles.headerRow}>
        <h1 className={styles.title}>
          Визит {visit.date || "без даты"}
          {place ? ` · ${place.name}` : ""}
        </h1>
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.actionButton}
            onClick={() => setIsEditing((prev) => !prev)}
          >
            {isEditing ? "Отмена" : "Изменить"}
          </button>
          <button
            type="button"
            className={styles.dangerButton}
            onClick={handleDelete}
          >
            Удалить
          </button>
        </div>
      </div>

      {isEditing ? (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Редактирование</h2>
          <div className={styles.editForm}>
            <label className={styles.label}>
              Дата
              <input
                type="date"
                className={styles.input}
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </label>
            <label className={styles.label}>
              Компаньоны
              <input
                type="text"
                className={styles.input}
                value={companions}
                onChange={(e) => setCompanions(e.target.value)}
                placeholder="Через запятую"
              />
            </label>
            <label className={styles.label}>
              Комментарий
              <textarea
                className={styles.textarea}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </label>
            <button
              type="button"
              className={styles.saveButton}
              onClick={handleSave}
              disabled={!date}
            >
              Сохранить
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Оценка</h2>
            <div className={styles.comment}>
              <p className={styles.text}>{visit.rating}</p>
            </div>
          </div>

          {visit.notes && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Комментарий</h2>
              <div className={styles.comment}>
                <p className={styles.text}>{visit.notes}</p>
              </div>
            </div>
          )}

          {companionsText && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Компаньоны</h2>
              <div className={styles.comment}>
                <p className={styles.text}>{companionsText}</p>
              </div>
            </div>
          )}
        </>
      )}

      {visit.photos && visit.photos.length > 0 && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Фотографии</h2>
          <div className={styles.photoGrid}>
            {visit.photos.map((photoRef, index) => (
              <VisitPhoto key={`${photoRef}-${index}`} photoRef={photoRef} />
            ))}
          </div>
        </div>
      )}

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Блюда</h2>
        <ul className={styles.dishes}>
          {visit.dishes.map((dish) => (
            <li key={dish.id}>
              <DishInfo
                name={dish.name}
                placeId={String(visit.placeId)}
                dishId={String(dish.id)}
              />
              {dish.visitNotes && (
                <p className={styles.text}>{dish.visitNotes}</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
