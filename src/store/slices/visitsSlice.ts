import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TSelectedDish } from "../../types/visit";
import { generateNumericId } from "../../mocks/mocks";

export type TVisit = {
  id: number;
  placeId: number;
  date: string;
  companions?: string[];
  rating: number;
  notes?: string;
  dishes: TSelectedDish[];
  photos?: string[];
};

export type TAddVisitPayload = {
  placeId: number;
  date: string;
  companions?: string[];
  rating: number;
  notes?: string;
  dishes: TSelectedDish[];
  photos?: string[];
};

export type TUpdateVisitPayload = {
  id: number;
  date: string;
  companions?: string[];
  notes?: string;
  rating: number;
  dishes: TSelectedDish[];
  photos?: string[];
};

export type TVisitsState = { visits: TVisit[] };

const initialState: TVisitsState = { visits: [] };

export const visitsSlice = createSlice({
  name: "visits",
  initialState,
  selectors: {
    selectVisits: (state) => state.visits,
  },
  reducers: {
    addVisit: (state, action: PayloadAction<TAddVisitPayload>) => {
      state.visits.push({
        ...action.payload,
        id: generateNumericId(),
      });
    },
    updateVisit: (state, action: PayloadAction<TUpdateVisitPayload>) => {
      const visit = state.visits.find((item) => item.id === action.payload.id);
      if (!visit) return;
      visit.date = action.payload.date;
      visit.companions = action.payload.companions;
      visit.notes = action.payload.notes;
      visit.rating = action.payload.rating;
      visit.dishes = action.payload.dishes;
      visit.photos = action.payload.photos;
    },
    deleteVisit: (state, action: PayloadAction<number>) => {
      state.visits = state.visits.filter((visit) => visit.id !== action.payload);
    },
    deleteVisitsByPlaceId: (state, action: PayloadAction<number>) => {
      state.visits = state.visits.filter(
        (visit) => visit.placeId !== action.payload
      );
    },
  },
});

export const {
  addVisit,
  updateVisit,
  deleteVisit,
  deleteVisitsByPlaceId,
} = visitsSlice.actions;
export const { selectVisits } = visitsSlice.selectors;

export const selectVisitsByPlaceId = createSelector(
  [
    (state: { visits: TVisitsState }) => state.visits.visits,
    (_: { visits: TVisitsState }, placeId: number) => placeId,
  ],
  (visits, placeId) => visits.filter((visit) => visit.placeId === placeId)
);

export const selectVisitById = createSelector(
  [
    (state: { visits: TVisitsState }) => state.visits.visits,
    (_: { visits: TVisitsState }, id: number) => id,
  ],
  (visits, id) => visits.find((visit) => visit.id === id) ?? null
);
