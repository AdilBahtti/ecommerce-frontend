import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/apiClient';

const errorPayload = (error) => error.response?.data || { message: error.message };

export const addToCart = createAsyncThunk('cart/addToCart', async (productId, { rejectWithValue }) => {
  try {
    const response = await api.post('/cart/add', { productId });
    return response.data;
  } catch (error) {
    return rejectWithValue(errorPayload(error));
  }
});

export const getallCartItems = createAsyncThunk('cart/getallCartItems', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/cart/');
    return response.data;
  } catch (error) {
    return rejectWithValue(errorPayload(error));
  }
});

export const updateCartItemQuantity = createAsyncThunk('cart/updateCartItemQuantity', async (id, { rejectWithValue }) => {
  try {
    const response = await api.put('/cart/update', { id });
    return response.data;
  } catch (error) {
    return rejectWithValue(errorPayload(error));
  }
});

export const removeCartItem = createAsyncThunk('cart/removeCartItem', async (productId, { rejectWithValue }) => {
  try {
    const response = await api.delete('/cart/remove', { data: { productId } });
    return response.data;
  } catch (error) {
    return rejectWithValue(errorPayload(error));
  }
});
