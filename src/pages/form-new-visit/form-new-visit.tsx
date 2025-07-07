import { useState } from "react";
import { RestaurantModal } from '../../components/restaurant/RestaurantModal';
import { DishModal } from '../../components/dish/DishModal';
import { StarRating } from '../../components/ui/StarRating';
import { Search, Plus, Camera, MapPin, Clock, Calendar, Users, DollarSign, Star } from 'lucide-react';
import styles from "./form-new-visit.module.css";
export function FormOfNewVisit() {
  const [isRestaurantModalOpen, setIsRestaurantModalOpen] = useState(false);
  const [isDishModalOpen, setIsDishModalOpen] = useState(false);
  
  // Mock data - would come from your data source in a real app
  const restaurants = [
    { id: '1', name: 'Bella Italia', cuisine: 'Italian' },
    { id: '2', name: 'Sakura Sushi', cuisine: 'Japanese' },
    { id: '3', name: 'Le Bistro', cuisine: 'French' },
  ];
  
  const dishes = [
    { id: '1', name: 'Margherita Pizza', restaurant: 'Bella Italia' },
    { id: '2', name: 'Carbonara', restaurant: 'Bella Italia' },
    { id: '3', name: 'Dragon Roll', restaurant: 'Sakura Sushi' },
    { id: '4', name: 'Miso Soup', restaurant: 'Sakura Sushi' },
    { id: '5', name: 'Coq au Vin', restaurant: 'Le Bistro' },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Добавить визит</h1>
      
      <form className={styles.form}>
        {/* Restaurant Selection */}
        <div className={styles.card}>
          <h2 className={styles.sectionTitle}>Ресторан</h2>
          
          <div className={styles.searchInputWrapper}>
            <div className={styles.searchIcon}>
              <Search size={18} />
            </div>
            <select className={styles.select}>
              <option value="">Выберите ресторан</option>
              {restaurants.map(restaurant => (
                <option key={restaurant.id} value={restaurant.id}>
                  {restaurant.name} ({restaurant.cuisine})
                </option>
              ))}
            </select>
          </div>
          
          <button 
            type="button"
            onClick={() => setIsRestaurantModalOpen(true)}
            className={styles.buttonSecondary}
          >
            <Plus size={18} />
            Добавить новый ресторан
          </button>
        </div>
        
        {/* Visit Details */}
        <div className={styles.card}>
          <h2 className={styles.sectionTitle}>Детали визита</h2>
          
          <div className={styles.grid}>
            {/* Date */}
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="visit-date">
                Дата
              </label>
              <div className={styles.searchInputWrapper}>
                <div className={styles.searchIcon}>
                  <Calendar size={18} />
                </div>
                <input 
                  type="date" 
                  id="visit-date"
                  className={styles.input}
                />
              </div>
            </div>
            
          
            
            {/* Companions */}
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="companions">
                Companions
              </label>
              <div className={styles.searchInputWrapper}>
                <div className={styles.searchIcon}>
                  <Users size={18} />
                </div>
                <input 
                  type="text" 
                  id="companions"
                  placeholder="e.g., Family, Friends, Solo" 
                  className={styles.input}
                />
              </div>
            </div>
          </div>
          
          {/* Overall Rating */}
          <div className={styles.formGroup}>
            <label className={styles.label}>
              Overall Rating
            </label>
            <StarRating size={24} />
          </div>
          
          {/* Notes */}
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="visit-notes">
              Notes
            </label>
            <textarea 
              id="visit-notes"
              placeholder="Share your experience..." 
              className={styles.textarea}
            ></textarea>
          </div>
        </div>
        
        {/* Dishes */}
        <div className={styles.card}>
          <h2 className={styles.sectionTitle}>Dishes</h2>
          
          <div className={styles.form}>
            {/* Would be dynamic in a real app */}
            <div className={styles.dishItem}>
              <div className={styles.dishHeader}>
                <div>
                  <h3 className={styles.dishTitle}>Margherita Pizza</h3>
                  <StarRating initialRating={4} size={18} />
                </div>
                <button type="button" className={styles.deleteButton}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 6h18"></path>
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                  </svg>
                </button>
              </div>
              <input 
                type="text" 
                placeholder="Notes about this dish..." 
                className={styles.input}
              />
            </div>
          </div>
          
          {/* Add Dish Section */}
          <div className={styles.form}>
            <div className={styles.searchInputWrapper}>
              <div className={styles.searchIcon}>
                <Search size={18} />
              </div>
              <select className={styles.select}>
                <option value="">Select a dish</option>
                {dishes.map(dish => (
                  <option key={dish.id} value={dish.id}>{dish.name}</option>
                ))}
              </select>
            </div>
            
            <button 
              type="button"
              onClick={() => setIsDishModalOpen(true)}
              className={styles.buttonSecondary}
            >
              <Plus size={18} />
              Add New Dish
            </button>
          </div>
        </div>
        
        {/* Photos */}
        <div className={styles.card}>
          <h2 className={styles.sectionTitle}>Photos</h2>
          
          <div className={styles.photoGrid}>
            {/* Would be dynamic in a real app */}
            <div className={styles.photoItem}>
              <img 
                src="https://images.pexels.com/photos/1579739/pexels-photo-1579739.jpeg" 
                alt="Food" 
                className={styles.photoImage}
              />
            </div>
          </div>
          
          <button type="button" className={styles.buttonSecondary}>
            <Camera size={18} />
            Add Photos
          </button>
        </div>
        
        {/* Submit Button */}
        <button type="submit" className={styles.buttonPrimary}>
          Save Visit
        </button>
      </form>
      
      {/* Modals */}
      <RestaurantModal 
        isOpen={isRestaurantModalOpen} 
        onClose={() => setIsRestaurantModalOpen(false)} 
      />
      
      <DishModal 
        isOpen={isDishModalOpen} 
        onClose={() => setIsDishModalOpen(false)} 
      />
    </div>
  );
}