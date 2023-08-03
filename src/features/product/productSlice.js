// productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {fetchProducts,fetchProductsByFilters} from "./productAPI"

// Async thunk for fetching the list of products
export const fetchProductsAsync = createAsyncThunk('products/fetchProducts', async () => {
  const response = await fetchProducts();
  return response.data;
});

// Async thunk for fetching products with filter

export const fetchProductsByFiltersAsync = createAsyncThunk('products/fetchProductsByFilters', async ({filter,sort}) => {
  const response = await fetchProductsByFilters(filter,sort);
  return response.data;
});

// Async thunk for fetching a single product by its ID

export const fetchProductById = createAsyncThunk('products/fetchProductById', async (productId) => {
  const response = await fetchProducts.endpoints.getProductById.initiate(productId);
  return response.data;
});

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    product: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    // ... other synchronous reducers if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProductsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })


      .addCase(fetchProductsByFiltersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsByFiltersAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProductsByFiltersAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
