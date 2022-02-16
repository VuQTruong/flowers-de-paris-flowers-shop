import { createSlice } from '@reduxjs/toolkit';

const querySlice = createSlice({
  name: 'query',
  initialState: {
    sortBy: '-createdAt',
    price: { low: null, high: null },
    tags: '',
    colors: [],
    size: 'All',
    rating: 0,
    page: '1',
  },
  reducers: {
    resetFilters: (state) => {
      state.sortBy = '-createdAt';
      state.price = { low: null, high: null };
      state.tags = '';
      state.colors = [];
      state.size = 'All';
      state.rating = 0;
      state.page = 1;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setPrice: (state, action) => {
      state.price = action.payload;
    },
    setTags: (state, action) => {
      state.tags = action.payload;
    },
    setColors: (state, action) => {
      state.colors = action.payload;
    },
    setSize: (state, action) => {
      state.size = action.payload;
    },
    setRating: (state, action) => {
      state.rating = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: {},
});

export const {
  resetFilters,
  setSortBy,
  setPrice,
  setTags,
  setColors,
  setSize,
  setRating,
  setPage,
} = querySlice.actions;
export default querySlice.reducer;
