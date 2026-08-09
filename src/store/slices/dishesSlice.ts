import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { dishesMocks, generateNumericId } from "../../mocks/mocks";
import { TVisitsState } from "./visitsSlice";

export type TDish = {
  id: number;
  name: string;
  placeId: number;
  rating: number;
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
    addDish: (state, action: PayloadAction<Pick<TDish, "name" | "placeId">>) => {
      if (
        state.dishes.some(
          (dish) =>
            dish.name.toLowerCase() === action.payload.name.toLowerCase() &&
            dish.placeId === action.payload.placeId
        )
      ) {
        return;
      }

      const newDish: TDish = {
        ...action.payload,
        id: generateNumericId(),
        rating: 0,
      };
      state.dishes.push(newDish);
    },
    updateDish: (
      state,
      action: PayloadAction<{ id: number; name: string }>
    ) => {
      const dish = state.dishes.find((item) => item.id === action.payload.id);
      if (!dish) return;

      const duplicate = state.dishes.some(
        (item) =>
          item.id !== action.payload.id &&
          item.placeId === dish.placeId &&
          item.name.toLowerCase() === action.payload.name.toLowerCase()
      );
      if (duplicate) return;

      dish.name = action.payload.name;
    },
    updateDishRating: (
      state,
      action: PayloadAction<{ id: number; rating: number }>
    ) => {
      const { id, rating } = action.payload;
      const dish = state.dishes.find((item) => item.id === id);
      if (dish) {
        dish.rating = rating;
      }
    },
    deleteDish: (state, action: PayloadAction<number>) => {
      state.dishes = state.dishes.filter((dish) => dish.id !== action.payload);
    },
    deleteDishesByPlaceId: (state, action: PayloadAction<number>) => {
      state.dishes = state.dishes.filter(
        (dish) => dish.placeId !== action.payload
      );
    },
  },
});

export const {
  addDish,
  updateDish,
  updateDishRating,
  deleteDish,
  deleteDishesByPlaceId,
} = dishesSlice.actions;
export const { selectDishes } = dishesSlice.selectors;

export const selectDishesByPlaceId = createSelector(
  [
    (state: { dishes: TDishesState }) => state.dishes.dishes,
    (_: { dishes: TDishesState }, placeId: number) => placeId,
  ],
  (dishes, placeId) => dishes.filter((dish) => dish.placeId === placeId)
);

export const selectDishById = createSelector(
  [
    (state: { dishes: TDishesState }) => state.dishes.dishes,
    (_: { dishes: TDishesState }, id: number) => id,
  ],
  (dishes, id) => dishes.find((dish) => dish.id === id) ?? null
);

export const selectDishOrderCountByPlace = createSelector(
  [
    (state: { visits: TVisitsState }) => state.visits.visits,
    (_: { visits: TVisitsState }, placeId: number) => placeId,
    (_: { visits: TVisitsState }, __: number, dishId: number) => dishId,
  ],
  (visits, placeId, dishId) =>
    visits
      .filter((visit) => visit.placeId === placeId)
      .reduce(
        (count, visit) =>
          count + visit.dishes.filter((dish) => dish.id === dishId).length,
        0
      )
);
