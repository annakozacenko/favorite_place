import { configureStore } from "@reduxjs/toolkit";
import { placesSlice } from "./slices/placesSlice";
import { dishesSlice } from "./slices/dishesSlice";
import { visitsSlice } from "./slices/visitsSlice";

export const store = configureStore({
  reducer: {
    places: placesSlice.reducer,
    dishes: dishesSlice.reducer,
    visits: visitsSlice.reducer,
  },
});
