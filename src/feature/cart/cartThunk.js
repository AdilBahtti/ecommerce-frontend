import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/cart';
const getTokenConfig = () => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  return config;
};


export const addToCart = createAsyncThunk('cart/addToCart', async (productId, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}/add`, { productId }, getTokenConfig());
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
}); 

export const getallCartItems = createAsyncThunk('cart/getallCartItems', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}/`, getTokenConfig());
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const updateCartItemQuantity = createAsyncThunk('cart/updateCartItemQuantity', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.put(`${API_URL}/update`, { id }, getTokenConfig());
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const removeCartItem = createAsyncThunk('cart/removeCartItem', async (productId, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`${API_URL}/remove`, { data: { productId }, ...getTokenConfig() });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
