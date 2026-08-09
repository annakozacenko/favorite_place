import { useEffect, useState } from "react";
import { resolvePhotoDisplayUrl } from "../../services/photos";
import styles from "./VisitPhoto.module.css";

type VisitPhotoProps = {
  photoRef: string;
  alt?: string;
  onRemove?: () => void;
};

export function VisitPhoto({ photoRef, alt = "Фото визита", onRemove }: VisitPhotoProps) {
  const [src, setSrc] = useState("");
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setFailed(false);

    resolvePhotoDisplayUrl(photoRef)
      .then((url) => {
        if (cancelled) return;
        if (!url) {
          setFailed(true);
          return;
        }
        setSrc(url);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
    };
  }, [photoRef]);

  return (
    <div className={styles.item}>
      {failed ? (
        <div className={styles.placeholder}>Нет превью</div>
      ) : src ? (
        <img className={styles.image} src={src} alt={alt} loading="lazy" />
      ) : (
        <div className={styles.placeholder}>…</div>
      )}
      {onRemove && (
        <button
          type="button"
          className={styles.remove}
          onClick={onRemove}
          aria-label="Удалить фото"
        >
          ×
        </button>
      )}
    </div>
  );
}
