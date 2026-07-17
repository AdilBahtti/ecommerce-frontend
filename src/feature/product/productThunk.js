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
};


const API_URL = 'http://localhost:5000/products';

const addProduct = createAsyncThunk('product/addProduct', async (productData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}/add`, productData, getTokenConfig(true));
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }});


const updateProduct = createAsyncThunk('product/updateProduct', async ({ id, productData }, { rejectWithValue }) => {
  try {
    const response = await axios.put(`${API_URL}/update/${id}`, productData, getTokenConfig(true));
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const deleteProduct = createAsyncThunk('product/deleteProduct', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`${API_URL}/delete/${id}`, getTokenConfig());
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }});

  const getAllProducts = createAsyncThunk('product/getAllProducts', async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/all`, getTokenConfig());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  });

  const getProductById = createAsyncThunk('product/getProductById', async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`, getTokenConfig());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  });

  const addReview = createAsyncThunk('product/addReview', async ({ id, reviewData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/review/${id}`, reviewData, getTokenConfig()); 
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  });

  const getFilterProducts = createAsyncThunk('product/getFilterProducts', async (filterParams, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/filter`, { params: filterParams });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  });
  const productPagination = createAsyncThunk('product/productPagination', async (paginationParams, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/pagination`, { params: paginationParams });
      return response.data;
    }

  catch (error) {     
  return rejectWithValue(error.response.data);
  }
});

  export { getFilterProducts, addProduct, updateProduct, deleteProduct, getAllProducts, getProductById, addReview, productPagination };
