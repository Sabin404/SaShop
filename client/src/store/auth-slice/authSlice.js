import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
};
const registerUser = createAsyncThunk('auth/register',
  async(formData)=>{
    const response = await axios.post('http://localhost:3000/api/auth/register', formData, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Expires': '0',
        'Pragma': 'no-cache'
      }
    });
    return response.data;
    }
)
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser:(state,action)=>{}
  },
  extraReducers:(builder)=>{
    builder.addCase(registerUser.pending, (state)=>{
      state.loading=true;
    }).addCase(registerUser.fulfilled, (state, action)=>{
      state.loading=false;
      state.isAuthenticated=false;
      state.user=null;
    }).addCase(registerUser.rejected, (state, action)=>{
      state.loading=false;
      state.isAuthenticated=false;
      state.user=null;;
    })
  }

})

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
export { registerUser };