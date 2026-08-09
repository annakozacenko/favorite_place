import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { generateNumericId, placesMocks, TCategories } from "../../mocks/mocks";

export type TPlace = {
  id: number;
  name: string;
  location: string;
  /** Счётчик визитов — для отображения используйте селекторы с visits */
  visits: number;
  category: TCategories;
  /** Средняя оценка — для отображения используйте селекторы с visits */
  rating: number;
  notes: string;
};

type TPlacesState = {
  places: TPlace[];
  selectedPlace: TPlace | null;
  favoritePlaces: TPlace[];
  filters: {
    category: TCategories | null;
    search: string | null;
  };
  sort: string | null;
};

const initialState: TPlacesState = {
  places: placesMocks,
  selectedPlace: null,
  favoritePlaces: [],
  filters: {
    category: null,
    search: null,
  },
  sort: "visitsHigh",
};

type TAddPlacePayload = {
  name: string;
  category: TCategories;
  location: string;
  notes: string;
};

type TUpdatePlacePayload = TAddPlacePayload & { id: number };

export const placesSlice = createSlice({
  name: "places",
  initialState,
  selectors: {
    selectPlaces: (state) => state.places,
    selectSelectedPlace: (state) => state.selectedPlace,
    selectFavoritePlaces: (state) => state.favoritePlaces,
    selectFavoritePlaceIds: (state) =>
      state.favoritePlaces.map((place) => place.id),
  },
  reducers: {
    addPlace: (state, action: PayloadAction<TAddPlacePayload>) => {
      if (
        state.places.some(
          (place) =>
            place.name.toLowerCase() === action.payload.name.toLowerCase()
        )
      ) {
        return;
      }

      const newPlace: TPlace = {
        ...action.payload,
        id: generateNumericId(),
        visits: 0,
        rating: 0,
      };
      state.places.push(newPlace);
    },

    updatePlace: (state, action: PayloadAction<TUpdatePlacePayload>) => {
      const place = state.places.find((item) => item.id === action.payload.id);
      if (!place) return;

      const duplicate = state.places.some(
        (item) =>
          item.id !== action.payload.id &&
          item.name.toLowerCase() === action.payload.name.toLowerCase()
      );
      if (duplicate) return;

      place.name = action.payload.name;
      place.category = action.payload.category;
      place.location = action.payload.location;
      place.notes = action.payload.notes;

      const favorite = state.favoritePlaces.find(
        (item) => item.id === action.payload.id
      );
      if (favorite) {
        favorite.name = place.name;
        favorite.category = place.category;
        favorite.location = place.location;
        favorite.notes = place.notes;
      }

      if (state.selectedPlace?.id === place.id) {
        state.selectedPlace = { ...place };
      }
    },

    deletePlace: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.places = state.places.filter((place) => place.id !== id);
      state.favoritePlaces = state.favoritePlaces.filter(
        (place) => place.id !== id
      );
      if (state.selectedPlace?.id === id) {
        state.selectedPlace = null;
      }
    },

    toggleFavoritePlace: (state, action: PayloadAction<TPlace>) => {
      if (
        state.favoritePlaces.some((place) => place.id === action.payload.id)
      ) {
        state.favoritePlaces = state.favoritePlaces.filter(
          (place) => place.id !== action.payload.id
        );
      } else {
        state.favoritePlaces.push(action.payload);
      }
    },

    selectPlace: (state, action: PayloadAction<TPlace>) => {
      state.selectedPlace = action.payload;
    },
    searchPlacesByName: (state, action: PayloadAction<string>) => {
      state.filters.search = action.payload || null;
    },
    sortPlaces: (state, action: PayloadAction<string>) => {
      state.sort = action.payload;
    },
    filterPlacesByCategory: (state, action: PayloadAction<string>) => {
      state.filters.category = (action.payload || null) as TCategories | null;
    },
    clearFilters: (state) => {
      state.filters = {
        category: null,
        search: null,
      };
      state.sort = "visitsHigh";
    },
  },
});

export const {
  addPlace,
  updatePlace,
  deletePlace,
  toggleFavoritePlace,
  selectPlace,
  searchPlacesByName,
  sortPlaces,
  clearFilters,
  filterPlacesByCategory,
} = placesSlice.actions;
export const {
  selectPlaces,
  selectSelectedPlace,
  selectFavoritePlaces,
  selectFavoritePlaceIds,
} = placesSlice.selectors;

export const selectIsPlaceFavorite = createSelector(
  [
    (state: { places: TPlacesState }) => state.places.favoritePlaces,
    (_: { places: TPlacesState }, id: number) => id,
  ],
  (favoritePlaces, id) => favoritePlaces.some((place) => place.id === id)
);

export const selectPlaceById = createSelector(
  [
    (state: { places: TPlacesState }) => state.places.places,
    (_: { places: TPlacesState }, id: number) => id,
  ],
  (places, id) => places.find((place) => place.id === id) ?? null
);
