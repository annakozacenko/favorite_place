import { configureStore } from "@reduxjs/toolkit";
import { placesSlice } from "./slices/placesSlice";
import { dishesSlice } from "./slices/dishesSlice";

export const store = configureStore({
  reducer: {
    places: placesSlice.reducer,
    dishes: dishesSlice.reducer,
  },
});
