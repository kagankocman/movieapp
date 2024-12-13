import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPage: 1,
  searchTerm: "",
  queryTerm: "",
};

const seriesSlice = createSlice({
  name: "series",
  initialState,
  reducers: {
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    setQueryTerm(state, action) {
      state.queryTerm = action.payload;
    },
  },
});

export const { setCurrentPage, setSearchTerm, setQueryTerm } = seriesSlice.actions;

export default seriesSlice.reducer;
