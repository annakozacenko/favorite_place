import { createSelector, createSlice } from "@reduxjs/toolkit";
import { dishesMocks, generateNumericId } from "../../mocks/mocks";
import { TVisitsState } from "./visitsSlice";

export type TDish = {
  id: number;
  name: string;
  placeId: number;
  //берется последняя оценка из визитов
  rating: number;
//  notes: string;
timesOrdered: number
  
};

type TDishesState = { dishes: TDish[] };

const initialState: TDishesState = { dishes: dishesMocks };

//? возможно нет смысла в отдельном слайсе для блюд, т.к их можно хранить в слайсе ресторанов
export const dishesSlice = createSlice({
  name: "dishes",
  initialState,
  selectors: {
    selectDishes: (state) => state.dishes,
  },
  reducers: {
    //? такая типизация ок? или лучше создать отдельный тип
    addDish: (state, action: { payload: Pick<TDish, "name" | "placeId"> }) => {
      if (
        state.dishes.some(
          (dish) =>
            dish.name.toLowerCase() === action.payload.name.toLowerCase()
        )
      ) {
        return;
      } else {
        const newDish = {
          ...action.payload,
          id: generateNumericId(),
          rating: 0,
          timesOrdered: 0
        };
        state.dishes.push(newDish);
      }
    },
        //TODO добавить обновелние количества заказов при редактировании заказа- если блюдо удалят
    updateDishRating: (state, action) => {
      const { id, rating } = action.payload;
      const dish = state.dishes.find((dish) => dish.id === id);
      if (dish) {
        dish.rating = rating;
      }
    },
    //TODO добавить обновелние количества заказов при редактировании заказа- если блюдо удалят
    updatedDishCounter: (state, action) => {
      const { id, } = action.payload;
      const dish = state.dishes.find((dish) => dish.id === id);
      if (dish) {
        dish.timesOrdered += 1;
      }
    }
  },
});

export const { addDish } = dishesSlice.actions;
export const { selectDishes } = dishesSlice.selectors;

export const selectDishesByPlaceId =
  createSelector(
    [(state: { dishes: TDishesState }) => state.dishes.dishes, (_, placeId: number) => placeId],
    (dishes, placeId) => dishes.filter((dish) => dish.placeId === placeId)
  );



  //шляпа какая-то пока что

export const selectDishOrderCountByPlace = createSelector(
  [
    (state: { visits: TVisitsState }) => state.visits.visits,
    (_: any, placeId: number) => placeId,
    (_: any, __: number, dishId: number) => dishId,
  ],
  (visits, placeId, dishId) =>
    visits
      .filter((visit) => visit.placeId === placeId)
      .reduce(
        (count, visit) =>
          count +
          visit.dishes.filter((dish) => dish.id === dishId).length,
        0
      )
);