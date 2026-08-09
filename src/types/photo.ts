/** Ссылка на фото: data URL в браузере или fp:path в файловой системе приложения */
export type TPhotoRef = string;

export const PHOTO_FILE_PREFIX = "fp:" as const;
export const MAX_VISIT_PHOTOS = 8;
