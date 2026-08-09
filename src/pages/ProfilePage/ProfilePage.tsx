import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useAppSelector } from "../../store/hooks";
import { PlacesInfo } from "../../components/PlacesInfo/PlacesInfo";
import {
  selectFavoritePlacesWithStats,
  selectProcessedPlaces,
} from "../../store/selectors";
import { selectVisits } from "../../store/slices/visitsSlice";
import { downloadBackup, readBackupFile, restoreBackup } from "../../store/backup";
import styles from "./ProfilePage.module.css";

export function ProfilePage() {
  const navigate = useNavigate();
  const favorites = useAppSelector(selectFavoritePlacesWithStats);
  const places = useAppSelector(selectProcessedPlaces);
  const visits = useAppSelector(selectVisits);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [backupMessage, setBackupMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);
  const [isRestoring, setIsRestoring] = useState(false);

  const totalPlaces = places.length;
  const totalVisits = visits.length;
  const favoriteCount = favorites.length;

  const handleExport = () => {
    downloadBackup();
    setBackupMessage({ text: "Резервная копия сохранена в загрузки", type: "success" });
    setTimeout(() => setBackupMessage(null), 4000);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleImportFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    setIsRestoring(true);
    setBackupMessage(null);

    try {
      const backup = await readBackupFile(file);
      const confirmed = window.confirm(
        "Текущие данные будут заменены содержимым файла. Продолжить?"
      );
      if (!confirmed) {
        setIsRestoring(false);
        return;
      }
      await restoreBackup(backup);
      setBackupMessage({ text: "Данные успешно восстановлены", type: "success" });
    } catch (error) {
      setBackupMessage({
        text: error instanceof Error ? error.message : "Не удалось восстановить копию",
        type: "error",
      });
    } finally {
      setIsRestoring(false);
      setTimeout(() => setBackupMessage(null), 5000);
    }
  };

  const hasData = totalPlaces > 0 || totalVisits > 0;

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Мой дневник</h1>

      {hasData ? (
        <nav className={styles.statGrid} aria-label="Статистика">
          <button
            type="button"
            className={styles.statCard}
            onClick={() => navigate("/places")}
            aria-label={`${totalPlaces} мест. Перейти к списку мест`}
          >
            <span className={styles.statNumber}>{totalPlaces}</span>
            <span className={styles.statLabel}>
              {totalPlaces === 1 ? "место" : totalPlaces < 5 ? "места" : "мест"}
            </span>
          </button>

          <button
            type="button"
            className={styles.statCard}
            onClick={() => navigate("/places")}
            aria-label={`${totalVisits} визитов. Перейти к списку мест`}
          >
            <span className={styles.statNumber}>{totalVisits}</span>
            <span className={styles.statLabel}>
              {totalVisits === 1
                ? "визит"
                : totalVisits < 5
                  ? "визита"
                  : "визитов"}
            </span>
          </button>

          <button
            type="button"
            className={styles.statCard}
            onClick={() => navigate("/places")}
            aria-label={`${favoriteCount} в избранном. Перейти к списку мест`}
          >
            <span className={styles.statNumber}>{favoriteCount}</span>
            <span className={styles.statLabel}>избранное</span>
          </button>
        </nav>
      ) : (
        <div className={styles.emptyState} role="status">
          <span className={styles.emptyEmoji} aria-hidden="true">
            📔
          </span>
          <p className={styles.emptyTitle}>Дневник пока пуст</p>
          <p className={styles.emptyText}>
            Добавьте первое место и запишите визит — воспоминания будут собираться здесь.
          </p>
          <button
            type="button"
            className={styles.emptyCta}
            onClick={() => navigate("/places")}
            aria-label="Перейти к списку мест"
          >
            <span className={styles.buttonPrimary}>Добавить место</span>
          </button>
        </div>
      )}

      {favoriteCount > 0 && (
        <section className={styles.actions} aria-labelledby="favorites-heading">
          <h2 id="favorites-heading" className={styles.sectionTitle}>
            Избранное
          </h2>
          {favorites.map((place) => (
            <PlacesInfo key={place.id} {...place} />
          ))}
        </section>
      )}

      <section className={styles.actions} aria-labelledby="backup-heading">
        <h2 id="backup-heading" className={styles.sectionTitle}>
          Данные на устройстве
        </h2>
        <div className={styles.actionCard}>
          <p className={styles.hint}>
            Места, визиты и блюда сохраняются автоматически в браузере. Экспортируйте
            резервную копию, чтобы не потерять записи при смене устройства.
          </p>
          <div className={styles.actionRow}>
            <button
              type="button"
              className={styles.buttonPrimary}
              onClick={handleExport}
              aria-label="Экспортировать резервную копию в JSON"
            >
              Экспорт JSON
            </button>
            <button
              type="button"
              className={styles.buttonSecondary}
              onClick={handleImportClick}
              disabled={isRestoring}
              aria-label="Импортировать резервную копию из JSON-файла"
            >
              {isRestoring ? "Импорт…" : "Импорт JSON"}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="application/json,.json"
              style={{ display: "none" }}
              onChange={handleImportFile}
              aria-hidden="true"
            />
          </div>
          {backupMessage && (
            <p
              className={
                backupMessage.type === "success"
                  ? styles.messageSuccess
                  : styles.messageError
              }
              role="status"
            >
              {backupMessage.text}
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
