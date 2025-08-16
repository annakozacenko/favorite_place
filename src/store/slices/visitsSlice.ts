import { createSelector, createSlice } from "@reduxjs/toolkit";
import { TSelectedDish } from "../../pages/NewVisitFormPage/NewVisitFormPage";
import { generateNumericId } from "../../mocks/mocks";

type TVisit = {
  id: number;
  placeId: number;
  date: string;
  companions?: string[];
  rating: number;
  notes?: string;
  dishes: TSelectedDish[];
};

export type TVisitsState = { visits: TVisit[] };

const initialState: TVisitsState = { visits: [] };

//? возможно нет смысла в отдельном слайсе для посещений, т.к их можно хранить в слайсе ресторанов
export const visitsSlice = createSlice({
  name: 'visits',
  initialState,
  selectors: {
    selectVisits: (state) => state.visits
  },
  reducers: {
    addVisit: (state, action) => {
      state.visits.push({ ...action.payload,
        id: generateNumericId(),
      });
    },
  },
});

export const { addVisit } = visitsSlice.actions;

export const selectVisitsByPlaceId =
  createSelector(
    [(state: { visits: TVisitsState }) => state.visits.visits, (_, placeId: number) => placeId],
    (visits, placeId) => visits.filter((visit) => visit.placeId === placeId)
  );