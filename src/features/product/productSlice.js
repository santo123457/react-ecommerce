// productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {fetchBrands, fetchCategories, fetchProductById, fetchProducts,fetchProductsByFilters} from "./productAPI"

// Async thunk for fetching the list of products
export const fetchProductsAsync = createAsyncThunk('products/fetchProducts', async () => {
  const response = await fetchProducts();
  return response.data;
});

// Async thunk for fetching products with filter

export const fetchProductsByFiltersAsync = createAsyncThunk('products/fetchProductsByFilters', async ({filter,sort,pagination}) => {
  const response = await fetchProductsByFilters(filter,sort,pagination);
  return response.data;
});


// Async thunk for fetching the list of Categories
export const fetchCategoriesAsync = createAsyncThunk('products/fetchCategories', async () => {
  const response = await fetchCategories();
  return response.data;
});

// Async thunk for fetching the list of Brands
export const fetchBrandsAsync = createAsyncThunk('products/fetchBrands', async () => {
  const response = await fetchBrands();
  console.log(response);
  return response.data;
});
fetchBrandsAsync()
// Async thunk for fetching a single product by its ID

export const fetchProductByIdAsync = createAsyncThunk('products/fetchProductById', async (productId) => {
  const response = await fetchProductById(productId);
  return response.data;
});

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    categories: [],
    brands: [],
    selectedProduct: null,
    status: 'idle',
    totalItems : 0,
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
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchProductsByFiltersAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })


      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
        
      })
      .addCase(fetchCategoriesAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(fetchBrandsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.brands = action.payload;
        console.log(action);
        
      })
      .addCase(fetchBrandsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })


      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductByIdAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
