import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';


const API_URL = 'http://localhost:5000/';

const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {  
    const { name, email, password , phone , address } = userData;

    try {
      const response = await axios.post(`${API_URL}auth/signup`, {
        name,
        email,
        password,
        phone,
        address
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData, { rejectWithValue }) => {
    const { email, password } = userData;
    try {
      const response = await axios.post(`${API_URL}auth/login`, {
        email,
        password
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export { registerUser, loginUser };