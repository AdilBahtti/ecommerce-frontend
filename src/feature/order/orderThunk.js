import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/apiClient';

const errorPayload = (error) => error.response?.data || { message: error.message };

const placeOrder = createAsyncThunk('order/placeOrder', async (orderData, { rejectWithValue }) => {
  try {
    const response = await api.post('/orders/place', orderData);
    return response.data;
  } catch (error) {
    return rejectWithValue(errorPayload(error));
  }
});

const getAllOrders = createAsyncThunk('order/getAllOrders', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/orders/');
    return response.data;
  } catch (error) {
    return rejectWithValue(errorPayload(error));
  }
});

const getOrderById = createAsyncThunk('order/getOrderById', async (id, { rejectWithValue }) => {
  try {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(errorPayload(error));
  }
});

const updateOrderStatus = createAsyncThunk('order/updateOrderStatus', async ({ id, status }, { rejectWithValue }) => {
  try {
    const response = await api.put(`/orders/${id}/status`, { status });
    return response.data;
  } catch (error) {
    return rejectWithValue(errorPayload(error));
  }
});

export { placeOrder, getAllOrders, getOrderById, updateOrderStatus };
