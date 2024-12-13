import { createSlice } from "@reduxjs/toolkit";
const wlseries = JSON.parse(localStorage.getItem("wlseries"));

const initialState = {
  series: wlseries || [],
};

const watchLaterSeriesSlice = createSlice({
  name: "wlSeries",
  initialState,
  reducers: {
    addWatchLaterSeries: (state, action) => {
      const exists = state.series.some((item) => item.id === action.payload.id);
      if (!exists) {
        state.series.push(action.payload);
        localStorage.setItem("wlseries", JSON.stringify(state.series));
      }
    },
    deleteWatchLaterSeries: (state, action) => {
      state.series = state.series.filter(
        (item) => item.id !== action.payload.id
      );
      localStorage.setItem("wlseries", JSON.stringify(state.series));
    },
    clearWatchLaterSeries: (state) => {
      state.series = [];
      localStorage.setItem("wlseries", JSON.stringify([]));
    },
  },
});

export const {
  addWatchLaterSeries,
  deleteWatchLaterSeries,
  clearWatchLaterSeries,
} = watchLaterSeriesSlice.actions;
export default watchLaterSeriesSlice.reducer;