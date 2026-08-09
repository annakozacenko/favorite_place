import storage from "redux-persist/lib/storage";
import { RootState, store } from "./store";

const PERSIST_KEY = "persist:favorite_place";
const BACKUP_VERSION = 1;

export type AppBackup = {
  version: number;
  exportedAt: string;
  data: RootState;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

export const isAppBackup = (value: unknown): value is AppBackup => {
  if (!isRecord(value) || value.version !== BACKUP_VERSION) return false;
  if (typeof value.exportedAt !== "string") return false;
  if (!isRecord(value.data)) return false;
  return (
    isRecord(value.data.places) &&
    isRecord(value.data.dishes) &&
    isRecord(value.data.visits)
  );
};

export const createBackup = (): AppBackup => ({
  version: BACKUP_VERSION,
  exportedAt: new Date().toISOString(),
  data: {
    places: store.getState().places,
    dishes: store.getState().dishes,
    visits: store.getState().visits,
  },
});

export const downloadBackup = () => {
  const backup = createBackup();
  const blob = new Blob([JSON.stringify(backup, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `favorite-place-backup-${backup.exportedAt.slice(0, 10)}.json`;
  link.click();
  URL.revokeObjectURL(url);
};

export const restoreBackup = async (backup: AppBackup) => {
  const persistedPayload = {
    ...backup.data,
    _persist: { version: BACKUP_VERSION, rehydrated: false },
  };

  await storage.setItem(PERSIST_KEY, JSON.stringify(persistedPayload));
  window.location.reload();
};

export const readBackupFile = (file: File): Promise<AppBackup> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed: unknown = JSON.parse(String(reader.result));
        if (!isAppBackup(parsed)) {
          reject(new Error("Неверный формат файла резервной копии"));
          return;
        }
        resolve(parsed);
      } catch {
        reject(new Error("Не удалось прочитать JSON"));
      }
    };
    reader.onerror = () => reject(new Error("Ошибка чтения файла"));
    reader.readAsText(file);
  });
