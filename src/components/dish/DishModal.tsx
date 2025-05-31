import { X } from 'lucide-react';
import styles from './DishModal.module.css';

type DishModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function DishModal  ({ isOpen, onClose }: DishModalProps)  {
  if (!isOpen) return null;

  // This would come from your data source in a real app
  const restaurants = [
    { id: '1', name: 'Bella Italia' },
    { id: '2', name: 'Sakura Sushi' },
    { id: '3', name: 'Le Bistro' },
  ];

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>Add New Dish</h2>
          <button 
            onClick={onClose}
            className={styles.closeButton}
          >
            <X size={20} />
          </button>
        </div>
        
        <div className={styles.content}>
          <form className={styles.form}>
            {/* Dish Name */}
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="dish-name">
                Dish Name*
              </label>
              <input 
                type="text" 
                id="dish-name"
                required 
                className={styles.input}
                placeholder="e.g., Margherita Pizza"
              />
            </div>
            
            {/* Restaurant */}
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="restaurant">
                Restaurant*
              </label>
              <select id="restaurant" required className={styles.select}>
                <option value="">Select a restaurant</option>
                {restaurants.map(restaurant => (
                  <option key={restaurant.id} value={restaurant.id}>
                    {restaurant.name}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Category */}
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="category">
                Category
              </label>
              <input 
                type="text" 
                id="category"
                className={styles.input}
                placeholder="e.g., Appetizer, Main Course, Dessert"
              />
            </div>
            
            {/* Description */}
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="description">
                Description
              </label>
              <textarea 
                id="description"
                placeholder="Describe the dish..." 
                className={styles.textarea}
              ></textarea>
            </div>
            
            <div className={styles.footer}>
              <button 
                type="button" 
                onClick={onClose}
                className={styles.buttonSecondary}
              >
                Cancel
              </button>
              <button 
                type="submit"
                className={styles.buttonPrimary}
              >
                Add Dish
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};