import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import client from 'stores/common/client';

const sliceName = 'calendar';
const initialState = { error: false, holidays: {}, isFetching: false };

const calendarGetListThunk = createAsyncThunk(
  `${sliceName}/getList`,
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await client.post('holidays', { ...params });

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const calendar = createSlice({
  name: sliceName,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(calendarGetListThunk.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(calendarGetListThunk.fulfilled, (state, action) => {
      const { error, holidays } = action.payload;

      state.error = error;
      state.holidays = holidays;
      state.isFetching = false;
    });
    builder.addCase(calendarGetListThunk.rejected, (state, action) => {
      const { error, reason } = action.payload.response.data;

      state.error = error;
      state.reason = reason;
      state.isFetching = false;
    });
  },
});

export default calendar.reducer;
export { calendarGetListThunk };
