import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState={
  isLoading:false,
  reviews:[]
}

export const addReview = createAsyncThunk(
  "/review/addReview",
  async(data)=>{
    const response = await axios.post('http://localhost:3000/api/shop/review/add',data)
    return response.data;
  }
)

export const getReview = createAsyncThunk(
  "/review/getReview",
  async(productId)=>{
    const response = await axios.get(`http://localhost:3000/api/shop/review/${productId}`)
    return response.data;
  }
)

const reviewSlice= createSlice({
  name:'reviewSlice',
  initialState,
  reducers:{},
  extraReducers:(builder)=>{
    builder.addCase(getReview.pending,(state)=>{
      state.isLoading=true
    }).addCase(getReview.fulfilled,(state,action)=>{
      state.isLoading=false;
      state.reviews=action.payload.data;
    }).addCase(getReview.rejected,(state)=>{
      state.isLoading=false,
      state.reviews=[];
    })
  }
})

export default reviewSlice.reducer