import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState={
  isLoading:false,
  productList:[]
}


export const fetchAllProducts = createAsyncThunk('/products/fetchAllFilteredProducts',async(formData)=>{
  const result = await axios.get('http://localhost:3000/api/shop/products/get');
  return result?.data;
})

const shopProductSlice= createSlice({
  name:'shoppingProducts',
  initialState,
  reducers:{},
  extraReducers:(builder)=>{
    builder.addCase(fetchAllProducts.pending,(state,action)=>{
      state.isLoading=true;
    }).addCase(fetchAllProducts.fulfilled,(state,action)=>{
      state.isLoading=false;
      state.productList=action.payload;
    }).addCase(fetchAllProducts.rejected,(state,action)=>{
      state.isLoading=false;
      state.productList=[]
    })
  }
})

export default shopProductSlice.reducer