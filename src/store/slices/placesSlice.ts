import { createSlice } from "@reduxjs/toolkit";
import { placesMocks } from "../../mocks/placesMocks";

export type TPlace = {
  id: number;
  name: string;
  location: string;
  visits: number;
  category: string;
};

//? лучше в избранных и выбранных хранить объекты полностью или айди объектов?
//? у меня в верстке есть фильтры и сортировка. Куда это добавлять?
type TPlacesState = {
  places: TPlace[];
  selectedPlace: TPlace | null;
  favoritePlaces: TPlace[];
};

const initialState: TPlacesState = {
  places: placesMocks,
  selectedPlace: null,
  favoritePlaces: [],
};

export const placesSlice = createSlice({
  name: "places",
  initialState,
  selectors: {
    selectPlaces: (state) => state.places,
    selectSelectedPlace: (state) => state.selectedPlace,
    selectFavoritePlaces: (state) => state.favoritePlaces,
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
      }
    },

    //? здесь в экшн подавать сам элемент или уже ид?
    toggleFavoritePlace: (state, action) => {
      if (
        state.favoritePlaces.some((place) => place.id === action.payload.id)
      ) {
        state.favoritePlaces.filter((place) => place.id === action.payload.id);
      } else {
        state.favoritePlaces.push(action.payload);
      }
    },

    //? здесь можно оставить так, но можно сделать и как toggle
    selectPlace: (state, action) => {
      state.selectedPlace = action.payload;
    },
  },
});

export const { addPlace, toggleFavoritePlace, selectPlace } =
  placesSlice.actions;
export const { selectPlaces, selectSelectedPlace, selectFavoritePlaces } =
  placesSlice.selectors;
