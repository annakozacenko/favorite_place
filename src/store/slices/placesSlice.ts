import { createSlice } from "@reduxjs/toolkit";
import { placesMocks } from "../../mocks/placesMocks";

export type TPlace = {
  id: number;
  name: string;
  location: string;
  visits: number;
  category: string;
  rating: number;
};

type TPlacesState = {
  places: TPlace[];
  selectedPlace: TPlace | null;
  favoritePlaces: TPlace[];
  processedPlaces: TPlace[];
  filters: {
    category: string | null;
    search: string | null;
  };
  sort: string | null;
};

const initialState: TPlacesState = {
  places: placesMocks,
  selectedPlace: null,
  favoritePlaces: [],
  processedPlaces: placesMocks,
  filters: {
    category: null,
    search: null,
  },
  sort: "visitsHigh",
};

//добавлена обобщающая функция сортировки и фильтрации, чтобы можно было комбинировать фильтры
const applyFiltersAndSort = (state: TPlacesState) => {
  let result = [...state.places];

  if (state.filters.category) {
    result = result.filter(
      (place) => place.category === state.filters.category
    );
  }
  if (state.filters.search) {
    result = result.filter((place) =>
      place.name.toLowerCase().includes(state.filters.search!.toLowerCase())
    );
  }

  if (state.sort) {
    if (state.sort === "visitsHigh") {
      result = [...result].sort((a, b) => b.visits - a.visits);
    }
    if (state.sort === "visitsLow") {
      result = [...result].sort((a, b) => a.visits - b.visits);
      console.log("result", result);
    }
    if (state.sort === "ratingHigh") {
      result = [...result].sort((a, b) => b.rating - a.rating);
    }
    if (state.sort === "ratingLow") {
      result = [...result].sort((a, b) => a.rating - b.rating);
    }
  }

  return result;
};

export const placesSlice = createSlice({
  name: "places",
  initialState,
  selectors: {
    selectPlaces: (state) => state.places,
    selectSelectedPlace: (state) => state.selectedPlace,
    selectFavoritePlaces: (state) => state.favoritePlaces,
    selectFavoritePlaceIds: (state) =>
      state.favoritePlaces.map((place) => place.id),
    selectProcessedPlaces: (state) => state.processedPlaces,
  },
  reducers: {
    addPlace: (state, action) => {
      if (
        state.places.some(
          (place) =>
            place.name.toLowerCase() === action.payload.name.toLowerCase()
        )
      ) {
        return;
        //? стоит ли добавлять ошибку о существующем месте
      } else {
        state.places.push(action.payload);
        state.processedPlaces = applyFiltersAndSort(state);
      }
    },

    toggleFavoritePlace: (state, action) => {
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

    selectPlace: (state, action) => {
      state.selectedPlace = action.payload;
    },
    searchPlacesByName: (state, action) => {
      state.filters.search = action.payload || null;
      state.processedPlaces = applyFiltersAndSort(state);
    },
    sortPlaces: (state, action) => {
      state.sort = action.payload;
      state.processedPlaces = applyFiltersAndSort(state);
    },
    filterPlacesByCategory: (state, action) => {
      state.filters.category = action.payload || null;
      state.processedPlaces = applyFiltersAndSort(state);
    },
    clearFilters: (state) => {
      state.filters = {
        category: null,
        search: null,
      };
      state.sort = null;
      state.processedPlaces = [...state.places];
    },
  },
});

export const {
  addPlace,
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
  selectProcessedPlaces,
} = placesSlice.selectors;
