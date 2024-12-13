import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  series: [],
};

const topRatedSeriesSlice = createSlice({
  name: "topRatedSeries",
  initialState,
  reducers: {
    addSeries: (state, action) => {
      const newSeries = action.payload.filter(
        (newSerie) => !state.series.some((serie) => serie.id === newSerie.id)
      );
      state.series = [...state.series, ...newSeries];
    },
    clearSeries: (state) => {
      state.series = [];
    },
  },
});

export const { addSeries, clearSeries } = topRatedSeriesSlice.actions;

export default topRatedSeriesSlice.reducer;
