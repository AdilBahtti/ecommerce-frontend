import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const getTokenConfig = (isFormData = false) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      'Authorization': `Bearer ${token}`,
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
    },
  };
}



const API_URL = 'http://localhost:5000/categories';

export const addCategory = createAsyncThunk('category/addCategory', async (categoryData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}/`, categoryData, getTokenConfig(true));
    return response.data;
  }
  catch (error) {
    return rejectWithValue(error.response.data);
  } 
});

export const updateCategory = createAsyncThunk('category/updateCategory', async ({ id, categoryData }, { rejectWithValue }) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, categoryData, getTokenConfig());
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const deleteCategory = createAsyncThunk('category/deleteCategory', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, getTokenConfig());
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const getAllCategories = createAsyncThunk('category/getAllCategories', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}/`, getTokenConfig());
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
