import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState={
  isLoading:false,
  productList:[],
  productDetails:null
}


export const fetchAllProducts = createAsyncThunk('/products/fetchAllFilteredProducts',
  async({filterParams,sortParams})=>{
    const query = new URLSearchParams({
      ...filterParams,
      sortBy:sortParams
    })
  const result = await axios.get(`http://localhost:3000/api/shop/products/get?${query}`);
  // console.log('API response data:', result.data);
  return result?.data.data;
  
})

export const fetchAllProductDetails = createAsyncThunk('/products/fetchAllFilteredProductDetails',
  async(id)=>{
    
  const result = await axios.get(`http://localhost:3000/api/shop/products/get/${id}`);
  // console.log('API response data:', result.data);
  return result?.data?.data;
  
})

const shopProductSlice= createSlice({
  name:'shoppingProducts',
  initialState,
  reducers:{
    setProductDetails:(state)=>{
      state.productDetails=null
    }
  },
  extraReducers:(builder)=>{
    builder.addCase(fetchAllProducts.pending,(state,action)=>{
      state.isLoading=true;
    }).addCase(fetchAllProducts.fulfilled,(state,action)=>{
      state.isLoading=false;
      state.productList=action.payload;
      // console.log(action.payload);
      
    }).addCase(fetchAllProducts.rejected,(state,action)=>{
      state.isLoading=false;
      state.productList=[]
    })
    .addCase(fetchAllProductDetails.pending,(state,action)=>{
      state.isLoading=true;
    }).addCase(fetchAllProductDetails.fulfilled,(state,action)=>{
      state.isLoading=false;
      state.productDetails=action.payload;
    }).addCase(fetchAllProductDetails.rejected,(state,action)=>{
      state.isLoading=false;
      state.productDetails=null
    })
  }
})
export const  {setProductDetails}= shopProductSlice.actions

export default shopProductSlice.reducer