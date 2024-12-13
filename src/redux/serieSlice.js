import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedSerie: null,
};

const serieSlice = createSlice({
  name: "serie",
  initialState,
  reducers: {
    setSelectedSerie(state, action) {
      state.selectedSerie = action.payload;
    },
    clearSelectedSerie(state) {
      state.selectedSerie = null;
    },
  },
});

export const { setSelectedSerie, clearSelectedSerie } = serieSlice.actions;

export default serieSlice.reducer;
