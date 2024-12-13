import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPage: 1,
  searchTerm: "",
  queryTerm: "",
};

const moviesSlice = createSlice({
  name: "movies",
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

export const { setCurrentPage, setSearchTerm, setQueryTerm } =
  moviesSlice.actions;

export default moviesSlice.reducer;
