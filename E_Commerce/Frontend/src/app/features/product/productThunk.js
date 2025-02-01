import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/api/axiosInstance";

// **Fetch all products**
export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/products");
      return response.data; // Ensure this returns an array
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Failed to fetch products");
    }
  }
);

// **Fetch single product by ID**
export const fetchProductById = createAsyncThunk(
  "products/fetchById",
  async (productId, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/products/${productId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Failed to fetch product");
    }
  }
);

export default {
  fetchProducts,
  fetchProductById,
};