// src/redux/orderSlice.js
import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  orderId: null,
  checkoutURL: null,
  error: null,
  orderList:[],
  orderDetails:null
};

// Async thunk to create a new order
export const addNewOrder = createAsyncThunk(
  "/order/addNewOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/shop/order/create",
        orderData
      );
      // console.log(response);
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const capturePayment = createAsyncThunk(
  "/order/capturePayment",
  async ({ orderId, paymentId, payerId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/shop/order/capture",
        {
          orderId,
          payerId,
          paymentId
        }
      );
      return response.data;
    } catch (error) {
      // return a rejected value to handle in extraReducers
      return rejectWithValue(
        error.response?.data || { message: "Something went wrong" }
      );
    }
  }
);

export const getAllOrdersByUserId = createAsyncThunk(
  "/order/getAllOrders",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/shop/order/list/${userId}`,
      );
      return response.data;
    } catch (error) {
      // return a rejected value to handle in extraReducers
      return rejectWithValue(
        error.response?.data || { message: "Something went wrong" }
      );
    }
  }
);

export const getOrderDetails = createAsyncThunk(
  "/order/capturePayment",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/shop/order/details/${id}`,
      );
      return response.data;
    } catch (error) {
      // return a rejected value to handle in extraReducers
      return rejectWithValue(
        error.response?.data || { message: "Something went wrong" }
      );
    }
  }
);


const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addNewOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderId = action.payload.orderId;
        state.checkoutURL = action.payload.checkoutURL;
        sessionStorage.setItem('currentOrderId',JSON.stringify(action.payload.orderId))
      })
      .addCase(addNewOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getAllOrdersByUserId.pending, (state, action) => {
        state.isLoading = false;
        // state.error = action.payload;
      })
      .addCase(getAllOrdersByUserId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList=action.payload.data
        state.error = null;
      })
      .addCase(getAllOrdersByUserId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.orderList=[]
      }).addCase(getOrderDetails.pending, (state, action) => {
        state.isLoading = false;
        // state.error = action.payload;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails=action.payload.data
        state.error = action.payload;
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.orderDetails=null
      });
  },
});

export default orderSlice.reducer;
