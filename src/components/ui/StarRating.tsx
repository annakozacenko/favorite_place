import { useState } from 'react';
import { Star } from 'lucide-react';
import styles from './StarRating.module.css';

type StarRatingProps = {
  initialRating?: number;
  onChange?: (rating: number) => void;
  size?: number;
};

export const StarRating = ({ initialRating = 0, onChange, size = 20 }: StarRatingProps) => {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);

  const handleClick = (index: number) => {
    const newRating = index + 1;
    setRating(newRating);
    if (onChange) {
      onChange(newRating);
    }
  };

  return (
    <div className={styles.container}>
      {[...Array(5)].map((_, index) => {
        const isActive = index < (hoverRating || rating);
        
        return (
          <button
            key={index}
            type="button"
            className={`${styles.starButton} ${isActive ? styles.starActive : styles.starInactive}`}
            onClick={() => handleClick(index)}
            onMouseEnter={() => setHoverRating(index + 1)}
            onMouseLeave={() => setHoverRating(0)}
          >
            <Star size={size} fill={isActive ? 'currentColor' : 'none'} />
          </button>
        );
      })}
      
      {rating > 0 && (
        <span className={styles.rating}>
          {rating}/5
        </span>
      )}
    </div>
  );
};