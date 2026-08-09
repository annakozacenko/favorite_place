import { useRef, useState } from "react";
import { useAppSelector } from "../../store/hooks";
import { PlacesInfo } from "../../components/PlacesInfo/PlacesInfo";
import { selectFavoritePlacesWithStats } from "../../store/selectors";
import { downloadBackup, readBackupFile, restoreBackup } from "../../store/backup";
import styles from "./ProfilePage.module.css";

export function ProfilePage() {
  const favorites = useAppSelector(selectFavoritePlacesWithStats);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [backupMessage, setBackupMessage] = useState<string | null>(null);
  const [isRestoring, setIsRestoring] = useState(false);

  const handleExport = () => {
    downloadBackup();
    setBackupMessage("Резервная копия сохранена в загрузки");
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
      if (!confirmed) return;
      await restoreBackup(backup);
    } catch (error) {
      setBackupMessage(
        error instanceof Error ? error.message : "Не удалось восстановить копию"
      );
    } finally {
      setIsRestoring(false);
    }
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Избранное</h1>

      <section className={styles.backup}>
        <h2 className={styles.subtitle}>Данные на устройстве</h2>
        <p className={styles.hint}>
          Места, визиты и блюда сохраняются автоматически в браузере.
        </p>
        <div className={styles.backupActions}>
          <button type="button" className={styles.button} onClick={handleExport}>
            Экспорт JSON
          </button>
          <button
            type="button"
            className={styles.buttonSecondary}
            onClick={handleImportClick}
            disabled={isRestoring}
          >
            {isRestoring ? "Импорт..." : "Импорт JSON"}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json,.json"
            className={styles.hiddenInput}
            onChange={handleImportFile}
          />
        </div>
        {backupMessage && <p className={styles.message}>{backupMessage}</p>}
      </section>

      {favorites.length === 0 ? (
        <p className={styles.empty}>
          Пока нет избранных мест. Нажмите на сердечко в списке мест.
        </p>
      ) : (
        <div className={styles.cards}>
          {favorites.map((place) => (
            <PlacesInfo key={place.id} {...place} />
          ))}
        </div>
      )}
    </div>
  );
}
