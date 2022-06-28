import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';

import { userAPI } from '../../api/userApi';

export const login = createAsyncThunk('user/login', async params => {
  const res = await userAPI.login(params);
  return res.data;
});

const initialState = {
  user: {},
  loading: false,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    addNewUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(login.pending, state => {
      state.loading = true;
    });
    builder.addCase(login.rejected, state => {
      state.loading = false;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      let data = action.payload;
      state.loading = false;
      if (data.status === 'success') {
        localStorage.setItem('token', data.data.token);
        state.user = data.data.data;
        message.success('Login successfully!');
      } else if (data.status === 'error') {
        message.error('This is an error message');
      }
    });
  },
});

export default loginSlice;

export const { addNewUser } = loginSlice.actions;
