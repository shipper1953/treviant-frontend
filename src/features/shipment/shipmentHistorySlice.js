import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api'; // ✅ fixed path

// Async thunk to fetch shipment history
export const fetchShipmentHistory = createAsyncThunk(
  'shipmentHistory/fetchShipmentHistory',
  async (email) => {
    const res = await api.get(`/api/shipping/history?email=${email}`);
    return res.data;
  }
);

const shipmentHistorySlice = createSlice({
  name: 'shipmentHistory',
  initialState: {
    shipments: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShipmentHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShipmentHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.shipments = action.payload;
      })
      .addCase(fetchShipmentHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default shipmentHistorySlice.reducer;
