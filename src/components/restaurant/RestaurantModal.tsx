import { X, MapPin } from 'lucide-react';
import styles from './RestaurantModal.module.css';

type RestaurantModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const RestaurantModal = ({ isOpen, onClose }: RestaurantModalProps) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>Add New Restaurant</h2>
          <button 
            onClick={onClose}
            className={styles.closeButton}
          >
            <X size={20} />
          </button>
        </div>
        
        <div className={styles.content}>
          <form className={styles.form}>
            {/* Restaurant Name */}
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="restaurant-name">
                Restaurant Name*
              </label>
              <input 
                type="text" 
                id="restaurant-name"
                required 
                className={styles.input}
              />
            </div>
            
            {/* Cuisine */}
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="cuisine">
                Cuisine*
              </label>
              <input 
                type="text" 
                id="cuisine"
                required 
                placeholder="e.g., Italian, Japanese, French" 
                className={styles.input}
              />
            </div>
            
            {/* Location */}
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="location">
                Location
              </label>
              <div className={styles.inputGroup}>
                <div className={styles.iconWrapper}>
                  <MapPin size={18} />
                </div>
                <input 
                  type="text" 
                  id="location"
                  placeholder="Address or neighborhood" 
                  className={styles.inputWithIcon}
                />
              </div>
            </div>
            
            {/* Contact Info */}
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="contact">
                Contact Info
              </label>
              <input 
                type="text" 
                id="contact"
                placeholder="Phone number or website" 
                className={styles.input}
              />
            </div>
            
            {/* Notes */}
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="restaurant-notes">
                Notes
              </label>
              <textarea 
                id="restaurant-notes"
                placeholder="Additional information about this restaurant..." 
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
                Add Restaurant
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};