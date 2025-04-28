// userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

export const loginUser = createAsyncThunk('user/loginUser', async (email) => {
  const res = await api.get(`/api/user-settings?email=${email}`);
  return { ...res.data, email };
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    email: '',
    company: '',
    name: '',
    street1: '',
    street2: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
    default_email: '',
    status: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        return { ...state, ...action.payload, status: 'succeeded' };
      })
      .addCase(loginUser.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default userSlice.reducer;