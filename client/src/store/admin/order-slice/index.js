import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  orderList: [],
  orderDetails: null
}

export const getAllOrdersForAdmin = createAsyncThunk(
  "/order/getAllOrdersForAdmin",
  async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/admin/orders/get`,
      );
      return response.data;
    } catch (error) {
      // return a rejected value to handle in extraReducers
      console.log(error);
      
    }
  }
);

export const getOrderDetailsForAdmin = createAsyncThunk(
  "/order/getOrderDetailsForAdmin",
  async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/admin/orders/details/${id}`,
      );
      return response.data;
    } catch (error) {
      // return a rejected value to handle in extraReducers
      console.log(error);
      
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "/order/updateOrderStatus",
  async ({id,orderStatus}) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/admin/orders/update/${id}`, {orderStatus}
      );
      return response.data;
    } catch (error) {
      // return a rejected value to handle in extraReducers
      console.log(error);
      
    }
  }
);


const adminOrderSlice = createSlice({
  name: 'adminOrderSlice',
  initialState,
  reducers: {
    clearOrderDetails: (state) => {
      state.orderDetails = null
    }
  },
  extraReducers: (builder) => {
    builder.
      addCase(getAllOrdersForAdmin.pending, (state, action) => {
        state.isLoading = false;
        // state.error = action.payload;
      })
      .addCase(getAllOrdersForAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data
        state.error = null;
      })
      .addCase(getAllOrdersForAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.orderList = []
      }).addCase(getOrderDetailsForAdmin.pending, (state, action) => {
        state.isLoading = false;
        // state.error = action.payload;
      })
      .addCase(getOrderDetailsForAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data
        state.error = action.payload;
      })
      .addCase(getOrderDetailsForAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.orderDetails = null
      });
  }
})

export const { clearOrderDetails } = adminOrderSlice.actions
export default adminOrderSlice.reducer