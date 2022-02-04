import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../../config/axios';

export const fetchCategories = createAsyncThunk(
  'categories/getAll',
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const { data } = await Axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/categories`
      );

      return data.data.categories;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    categories: null,
    loading: false,
    error: '',
  },
  reducers: {},
  extraReducers: {
    [fetchCategories.pending]: (state) => {
      state.loading = true;
      state.error = '';
      state.categories = null;
    },
    [fetchCategories.fulfilled]: (state, action) => {
      state.loading = false;
      state.categories = action.payload;
    },
    [fetchCategories.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default categoriesSlice.reducer;
