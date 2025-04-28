import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice';
import shipmentHistoryReducer from './features/shipment/shipmentHistorySlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    shipmentHistory: shipmentHistoryReducer,
  },
});

export default store;
