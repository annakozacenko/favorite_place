import { Capacitor } from "@capacitor/core";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { Directory, Filesystem } from "@capacitor/filesystem";
import { PHOTO_FILE_PREFIX } from "../types/photo";

const VISITS_DIR = "visits";

const readBlobAsDataUrl = (blob: Blob): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Не удалось прочитать файл"));
    reader.readAsDataURL(blob);
  });

const readUriAsBase64 = async (uri: string): Promise<string> => {
  const response = await fetch(uri);
  const blob = await response.blob();
  const dataUrl = await readBlobAsDataUrl(blob);
  const base64 = dataUrl.split(",")[1];
  if (!base64) throw new Error("Пустой файл изображения");
  return base64;
};

const persistOnDevice = async (sourceUri: string): Promise<string> => {
  const fileName = `${VISITS_DIR}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.jpeg`;
  const base64 = await readUriAsBase64(sourceUri);
  await Filesystem.writeFile({
    path: fileName,
    data: base64,
    directory: Directory.Data,
  });
  return `${PHOTO_FILE_PREFIX}${fileName}`;
};

const persistOnWeb = async (sourceUri: string): Promise<string> => {
  const response = await fetch(sourceUri);
  const blob = await response.blob();
  return readBlobAsDataUrl(blob);
};

/** Сохраняет фото и возвращает ссылку для хранения в Redux */
export const persistPhoto = async (sourceUri: string): Promise<string> => {
  if (Capacitor.isNativePlatform()) {
    return persistOnDevice(sourceUri);
  }
  return persistOnWeb(sourceUri);
};

export const resolvePhotoDisplayUrl = async (stored: string): Promise<string> => {
  if (!stored.startsWith(PHOTO_FILE_PREFIX)) {
    return stored;
  }

  const path = stored.slice(PHOTO_FILE_PREFIX.length);

  if (!Capacitor.isNativePlatform()) {
    return "";
  }

  try {
    const { uri } = await Filesystem.getUri({
      directory: Directory.Data,
      path,
    });
    return Capacitor.convertFileSrc(uri);
  } catch {
    return "";
  }
};

export const pickPhotoFromFileInput = (): Promise<string> =>
  new Promise((resolve, reject) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) {
        reject(new Error("Файл не выбран"));
        return;
      }
      try {
        const dataUrl = await readBlobAsDataUrl(file);
        resolve(dataUrl);
      } catch (error) {
        reject(error);
      }
    };
    input.click();
  });

export const pickPhotoForVisit = async (): Promise<string> => {
  if (Capacitor.isNativePlatform()) {
    const permissions = await Camera.checkPermissions();
    if (permissions.camera !== "granted" || permissions.photos !== "granted") {
      await Camera.requestPermissions();
    }

    const photo = await Camera.getPhoto({
      quality: 85,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Prompt,
      correctOrientation: true,
    });

    if (!photo.webPath) {
      throw new Error("Фото не получено");
    }

    return persistPhoto(photo.webPath);
  }

  const dataUrl = await pickPhotoFromFileInput();
  return dataUrl;
};
