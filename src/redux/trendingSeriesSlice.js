import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  series: [],
};

const trendingSeriesSlice = createSlice({
  name: "trendingSeries",
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

export const { addSeries, clearSeries } = trendingSeriesSlice.actions;
export default trendingSeriesSlice.reducer;

