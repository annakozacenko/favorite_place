import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RestaurantModal } from "../../components/RestaurantModal/RestaurantModal";
import { DishModal } from "../../components/DishModal/DishModal";
import { StarRating } from "../../components/ui/StarRating";
import { Search, Plus, Calendar, Users, Camera } from "lucide-react";
import styles from "./NewVisitFormPage.module.css";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectPlaces } from "../../store/slices/placesSlice";
import { selectDishesByPlaceId } from "../../store/slices/dishesSlice";
import { FaRegTrashCan } from "react-icons/fa6";
import { addVisit } from "../../store/slices/visitsSlice";
import { updateDishRating } from "../../store/slices/dishesSlice";
import { TSelectedDish } from "../../types/visit";
import { MAX_VISIT_PHOTOS } from "../../types/photo";
import { pickPhotoForVisit } from "../../services/photos";
import { VisitPhoto } from "../../components/VisitPhoto/VisitPhoto";

type FormErrors = {
  restaurant?: string;
  date?: string;
  dishes?: string;
};

export function FormOfNewVisitPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isRestaurantModalOpen, setIsRestaurantModalOpen] = useState(false);
  const [isDishModalOpen, setIsDishModalOpen] = useState(false);
  const [selectedDishes, setSelectedDishes] = useState<TSelectedDish[]>([]);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<
    number | null
  >(null);

  const [notes, setNotes] = useState("");
  const [date, setDate] = useState("");
  const [companions, setCompanions] = useState("");
  const [overallRating, setOverallRating] = useState(0);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [photos, setPhotos] = useState<string[]>([]);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [isAddingPhoto, setIsAddingPhoto] = useState(false);
  
  // Save state management
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [saveMessage, setSaveMessage] = useState<string>('');
  const [isDraftSaved, setIsDraftSaved] = useState(false);
  const [showDraftNotification, setShowDraftNotification] = useState(false);
  
  // Auto-save draft interval
  let autoSaveTimer: ReturnType<typeof setTimeout> | null = null;
  
  // Auto-save draft when form changes
  const triggerAutoSave = () => {
    if (autoSaveTimer) clearTimeout(autoSaveTimer);
    autoSaveTimer = setTimeout(() => {
      saveDraft();
    }, 1000);
  };
  
  // Save draft to localStorage
  const saveDraft = () => {
    const draft = {
      selectedRestaurantId,
      selectedDishes,
      notes,
      date,
      companions,
      overallRating,
      photos,
    };
    localStorage.setItem('visitFormDraft', JSON.stringify(draft));
    setIsDraftSaved(true);
    setShowDraftNotification(true);
    setTimeout(() => setShowDraftNotification(false), 3000);
  };
  
  // Load draft from localStorage on mount
  React.useEffect(() => {
    const savedDraft = localStorage.getItem('visitFormDraft');
    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft);
        setSelectedRestaurantId(draft.selectedRestaurantId);
        setSelectedDishes(draft.selectedDishes);
        setNotes(draft.notes);
        setDate(draft.date);
        setCompanions(draft.companions);
        setOverallRating(draft.overallRating);
        setPhotos(draft.photos);
      } catch (error) {
        console.error('Failed to load draft:', error);
      }
    }
  }, []);
  
  // Clear draft on successful save
  const clearDraft = () => {
    localStorage.removeItem('visitFormDraft');
    setIsDraftSaved(false);
  };
  
  // Reset save status
  const resetSaveStatus = () => {
    setSaveStatus('idle');
    setSaveMessage('');
  };

  const restaurants = useAppSelector(selectPlaces);
  const dishes = useAppSelector((state) =>
    selectedRestaurantId !== null
      ? selectDishesByPlaceId(state, selectedRestaurantId)
      : []
  );

  // Обработчик выбора блюда
  const handleDishSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const dishId = Number(e.target.value);
    const selectedDish = dishes.find((dish) => dish.id === dishId);
    if (selectedDish && !selectedDishes.some((dish) => dish.id === dishId)) {
      setSelectedDishes([
        ...selectedDishes,
        { ...selectedDish, visitNotes: "", visitRating: 0 },
      ]);
      triggerAutoSave();
    }
    e.target.value = ""; // Сбросить выбор
  };

  // Обработчик удаления блюда
  const handleRemoveDish = (dishId: number) => {
    setSelectedDishes(selectedDishes.filter((dish) => dish.id !== dishId));
    triggerAutoSave();
  };

  // Обработчик изменения рейтинга для блюда
  const handleDishRatingChange = (dishId: number, rating: number) => {
    setSelectedDishes((prevDishes) => {
      const updatedDishes = prevDishes.map((dish) =>
        dish.id === dishId ? { ...dish, visitRating: rating } : dish
      );
      const sum = updatedDishes.reduce((acc, dish) => acc + dish.visitRating, 0);
      const average = updatedDishes.length > 0 ? sum / updatedDishes.length : 0;
      setOverallRating(average);
      return updatedDishes;
    });
    triggerAutoSave();
  };

  // Обработчик изменения заметок для блюда
  const handleDishNotesChange = (dishId: number, notes: string) => {
    setSelectedDishes(
      selectedDishes.map((dish) =>
        dish.id === dishId ? { ...dish, visitNotes: notes } : dish
      )
    );
    triggerAutoSave();
  };

  const parseCompanions = (value: string): string[] =>
    value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

  // Enhanced validation with real-time feedback
  const validateField = (field: keyof FormErrors): boolean => {
    const errors = validateForm();
    return !errors[field];
  };

  const validateForm = (): FormErrors => {
    const errors: FormErrors = {};
    if (selectedRestaurantId === null) {
      errors.restaurant = "Выберите ресторан";
    }
    if (!date) {
      errors.date = "Укажите дату визита";
    }
    if (selectedDishes.length === 0) {
      errors.dishes = "Добавьте хотя бы одно блюдо";
    }
    if (
      selectedDishes.length > 0 &&
      selectedDishes.some((dish) => dish.visitRating <= 0)
    ) {
      errors.dishes = "Поставьте оценку каждому блюду";
    }
    return errors;
  };

  // Check if form is valid
  const isFormValid = () => {
    const errors = validateForm();
    return Object.keys(errors).length === 0;
  };

  // Check if a specific field is valid
  const isFieldValid = (field: keyof FormErrors): boolean => {
    return !formErrors[field];
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;
    if (selectedRestaurantId === null) return;

    setIsSaving(true);
    setSaveStatus('saving');
    setSaveMessage('Сохранение...');

    const companionsList = parseCompanions(companions);

    try {
      dispatch(
        addVisit({
          placeId: selectedRestaurantId,
          date,
          companions: companionsList.length > 0 ? companionsList : undefined,
          rating: overallRating,
          notes: notes || undefined,
          dishes: selectedDishes,
          photos: photos.length > 0 ? photos : undefined,
        })
      );

      selectedDishes.forEach((dish) => {
        if (dish.visitRating > 0) {
          dispatch(updateDishRating({ id: dish.id, rating: dish.visitRating }));
        }
      });

      // Clear draft on successful save
      clearDraft();
      
      // Show success message
      setSaveStatus('success');
      setSaveMessage('Визит успешно сохранен!');
      
      // Reset form after delay
      setTimeout(() => {
        setSelectedRestaurantId(null);
        setSelectedDishes([]);
        setNotes("");
        setDate("");
        setCompanions("");
        setOverallRating(0);
        setPhotos([]);
        setPhotoError(null);
        setFormErrors({});
        resetSaveStatus();
        navigate(`/place/${selectedRestaurantId}`);
      }, 1500);
    } catch (error) {
      setSaveStatus('error');
      setSaveMessage('Ошибка при сохранении. Попробуйте еще раз.');
      console.error('Failed to save visit:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddPhoto = async () => {
    if (photos.length >= MAX_VISIT_PHOTOS) {
      setPhotoError(`Максимум ${MAX_VISIT_PHOTOS} фото на визит`);
      return;
    }

    setIsAddingPhoto(true);
    setPhotoError(null);

    try {
      const photoRef = await pickPhotoForVisit();
      setPhotos((prev) => [...prev, photoRef]);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Не удалось добавить фото";
      if (!message.toLowerCase().includes("cancel")) {
        setPhotoError(message);
      }
    } finally {
      setIsAddingPhoto(false);
    }
  };

  const handleRemovePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Добавить визит</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        {/* Выбор ресторана */}
        <div className={styles.card}>
          <h2 className={styles.sectionTitle}>Ресторан</h2>

          <div className={styles.searchInputWrapper}>
            <div className={styles.searchIcon}>
              <Search size={18} />
            </div>
            <select
              value={selectedRestaurantId ?? ""}
              onChange={(e) => {
                const value = e.target.value;
                setSelectedRestaurantId(value ? Number(value) : null);
                setSelectedDishes([]);
                setFormErrors((prev) => ({ ...prev, restaurant: undefined }));
              }}
              className={`${styles.select} ${!isFieldValid('restaurant') ? styles.selectError : ''}`}
              aria-invalid={Boolean(formErrors.restaurant)}
            >
              <option value="">Выберите ресторан</option>
              {restaurants.map((restaurant) => (
                <option key={restaurant.id} value={restaurant.id}>
                  {restaurant.name} ({restaurant.category})
                </option>
              ))}
            </select>
          </div>
          {formErrors.restaurant && (
            <p className={styles.error}>{formErrors.restaurant}</p>
          )}

          <button
            type="button"
            onClick={() => setIsRestaurantModalOpen(true)}
            className={styles.buttonSecondary}
          >
            <Plus size={18} />
            Добавить новый ресторан
          </button>
        </div>

        {/* Детали визита */}
        <div className={styles.card}>
          <h2 className={styles.sectionTitle}>Детали визита</h2>

          <div className={styles.grid}>
            {/* Дата */}
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
                  className={`${styles.input} ${!isFieldValid('date') ? styles.selectError : ''}`}
                  onChange={(e) => {
                    setDate(e.target.value);
                    setFormErrors((prev) => ({ ...prev, date: undefined }));
                  }}
                  value={date}
                  aria-invalid={Boolean(formErrors.date)}
                />
              </div>
              {formErrors.date && (
                <p className={styles.error}>{formErrors.date}</p>
              )}
            </div>

            {/* Компаньоны */}
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="companions">
                Компаньоны
              </label>
              <div className={styles.searchInputWrapper}>
                <div className={styles.searchIcon}>
                  <Users size={18} />
                </div>
                <input
                  type="text"
                  id="companions"
                  placeholder="Один, с партнером, с друзьями..."
                  className={styles.input}
                  onChange={(e) => setCompanions(e.target.value)}
                  value={companions}
                />
              </div>
            </div>
          </div>

          {/* Overall Rating */}
          {/* <div className={styles.formGroup}>
            <label className={styles.label}>Overall Rating</label>
            <StarRating size={24} />
          </div> */}

          {/* Заметки */}
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="visit-notes">
              Заметки
            </label>
            <textarea
              id="visit-notes"
              placeholder="Добавить заметки..."
              className={styles.textarea}
              onChange={(e) => setNotes(e.target.value)}
              value={notes}
            ></textarea>
          </div>
        </div>

        {/* Выбор блюд */}
        <div className={styles.card}>
          <h2 className={styles.sectionTitle}>Блюда</h2>
          {formErrors.dishes && (
            <p className={styles.error}>{formErrors.dishes}</p>
          )}
          <div className={styles.totalRating}>
            <span>Общая оценка: {overallRating}</span>
          </div>
          <div className={styles.form}>
            {/* Список выбранных блюд */}
            {selectedDishes.map((dish) => (
              <div key={dish.id} className={styles.dishItem}>
                <div className={styles.dishHeader}>
                  <div>
                    <h3 className={styles.dishTitle}>{dish.name}</h3>
                    <StarRating
                      initialRating={dish.visitRating || 0}
                      size={18}
                      onChange={(rating) =>
                        handleDishRatingChange(dish.id, rating)
                      }
                    />
                  </div>
                  <button
                    type="button"
                    className={styles.deleteButton}
                    onClick={() => handleRemoveDish(dish.id)}
                  >
                    <FaRegTrashCan size={18} />
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Заметки о блюде..."
                  className={styles.input}
                  value={dish.visitNotes || ""}
                  onChange={(e) =>
                    handleDishNotesChange(dish.id, e.target.value)
                  }
                  aria-label={`Заметки для блюда ${dish.name}`}
                />
              </div>
            ))}
          </div>

          {/* Добавление блюда */}
          <div className={styles.form}>
            <div className={styles.searchInputWrapper}>
              <div className={styles.searchIcon}>
                <Search size={18} />
              </div>
              <select
                className={styles.select}
                disabled={selectedRestaurantId === null}
                defaultValue=""
                onChange={handleDishSelect}
                aria-label="Выбор блюда"
              >
                <option value="" disabled>
                  {selectedRestaurantId === null
                    ? "Сначала выберите ресторан"
                    : "Выберите блюдо"}
                </option>
                {dishes.map((dish) => (
                  <option key={dish.id} value={dish.id}>
                    {dish.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={() => setIsDishModalOpen(true)}
              className={styles.buttonSecondary}
              disabled={selectedRestaurantId === null}
              aria-label="Добавить новое блюдо"
            >
              <Plus size={18} />
              Добавить новое блюдо
            </button>
          </div>
        </div>

        <div className={styles.card}>
          <h2 className={styles.sectionTitle}>Фотографии</h2>
          <p className={styles.photoHint}>
            На телефоне — камера или галерея, в браузере — выбор файла.
          </p>

          {photos.length > 0 && (
            <div className={styles.photoGrid}>
              {photos.map((photoRef, index) => (
                <VisitPhoto
                  key={`${photoRef}-${index}`}
                  photoRef={photoRef}
                  onRemove={() => handleRemovePhoto(index)}
                />
              ))}
            </div>
          )}

          <button
            type="button"
            className={styles.buttonSecondary}
            onClick={() => void handleAddPhoto()}
            disabled={isAddingPhoto || photos.length >= MAX_VISIT_PHOTOS}
          >
            <Camera size={18} />
            {isAddingPhoto ? "Добавление..." : "Добавить фото"}
          </button>
          {photoError && <p className={styles.error}>{photoError}</p>}
        </div>

        {/* Кнопка сохранения */}
        <button 
          type="submit" 
          className={styles.buttonPrimary}
          disabled={isSaving || !isFormValid()}
        >
          {isSaving ? 'Сохранение...' : 'Сохранить визит'}
        </button>
        
        {/* Save status indicator */}
        {saveStatus !== 'idle' && (
          <div className={`${styles.saveStatus} ${styles[saveStatus]}`}>
            {saveMessage}
          </div>
        )}
        
        {/* Draft notification */}
        {showDraftNotification && (
          <div className={styles.draftNotification}>
            <span>Черновик сохранен</span>
          </div>
        )}
      </form>

      {/* Модальные окна */}
      <RestaurantModal
        isOpen={isRestaurantModalOpen}
        onClose={() => setIsRestaurantModalOpen(false)}
      />

      <DishModal
        isOpen={isDishModalOpen}
        onClose={() => setIsDishModalOpen(false)}
        placeId={selectedRestaurantId || 0}
      />
    </div>
  );
}
