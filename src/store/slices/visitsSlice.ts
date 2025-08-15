import { createSlice } from "@reduxjs/toolkit";

type TVisit = {
  id: number;
  placeId: number;
  date: string;
  companions?: string[];
  rating: number;
  notes?: string;
  dishes?: number[];
};

type TVisitsState = { visits: TVisit[] };

const initialState: TVisitsState = { visits: [] };

const visitsSlice = createSlice({
  name: 'visits',
  initialState,
  reducers: {
    addVisit: (state, action) => {
      state.visits.push(action.payload);
    },
  },
});

export const { addVisit } = visitsSlice.actions;
export default visitsSlice.reducer;
