import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
  const API_URL = 'http://localhost:5000/orders';
const getTokenConfig = () => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  return config;
};

const placeOrder = createAsyncThunk('order/placeOrder', async (orderData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}/place`, orderData, getTokenConfig());
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const getAllOrders = createAsyncThunk('order/getAllOrders', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}/`, getTokenConfig());
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const getOrderById = createAsyncThunk('order/getOrderById', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`, getTokenConfig());
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
 
const updateOrderStatus = createAsyncThunk('order/updateOrderStatus', async ({ id, status }, { rejectWithValue }) => {
  try {
    const response = await axios.put(`${API_URL}/${id}/status`, { status }, getTokenConfig());
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
 
export { placeOrder, getAllOrders, getOrderById, updateOrderStatus };