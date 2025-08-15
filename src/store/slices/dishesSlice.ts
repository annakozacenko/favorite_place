import { createSelector, createSlice } from "@reduxjs/toolkit";
import { dishesMocks, generateNumericId } from "../../mocks/placesMocks";

export type TDish = {
  id: number;
  name: string;
  placeId: number;
  rating: number;
  notes: string;
};

type TDishesState = { dishes: TDish[] };

const initialState: TDishesState = { dishes: dishesMocks };

export const dishesSlice = createSlice({
  name: "dishes",
  initialState,
  selectors: {
    selectDishes: (state) => state.dishes,
  },
  reducers: {
    addDish: (state, action) => {
      if (
        state.dishes.some(
          (dish) =>
            dish.name.toLowerCase() === action.payload.name.toLowerCase()
        )
      ) {
        return;
      } else {
        const newPDish = {
          ...action.payload,
          id: generateNumericId(),
        };
        state.dishes.push(newPDish);
      }
    },
  },
});

export const { addDish } = dishesSlice.actions;
export const { selectDishes } = dishesSlice.selectors;

export const selectDishesByPlaceId =
  createSelector(
    [(state: { dishes: TDishesState }) => state.dishes.dishes, (_, placeId: number) => placeId],
    (dishes, placeId) => dishes.filter((dish) => dish.placeId === placeId)
  );
