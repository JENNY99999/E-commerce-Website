import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "./productService";


export const getAllProducts = createAsyncThunk(
  "products/getallproduct",
  async (data, thunkAPI) => {
    try {
      return await productService.fetchProducts(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getProduct = createAsyncThunk(
  "products/getproduct",
  async (prodId, thunkAPI) => {
    try {
      return await productService.fetchProduct(prodId)
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


const productState = {

  products: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

const productSlice = createSlice({
  name: "product",
  initialState: productState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.products = action.payload;
        state.message = "Product Fetched Successfully!"
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.products = [];
        state.message = action.error;
      })


      .addCase(getProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.singleProduct = action.payload;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.singleProduct = [];
        state.message = action.error;
      })

  },
});

export default productSlice.reducer;

