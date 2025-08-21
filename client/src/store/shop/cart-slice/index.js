import axios from "axios";
import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

const initialState={
  cart:null,
  cartItems:[],
  isLoading:false
}

export const addToCart = createAsyncThunk('/cart/addToCart',async({userId,productId,quantity})=>{
  const response = await axios.post('http://localhost:3000/api/shop/cart/add',{
    userId,productId,quantity
  })

  return response.data
})
export const fetchCartItems = createAsyncThunk('/cart/fetchCartItems',async(userId)=>{
  const response = await axios.get(`http://localhost:3000/api/shop/cart/get/${userId}`)

  // console.log(response.data);
  return response.data
  
})
export const deleteCartItem = createAsyncThunk('/cart/deleteCartItem',async({userId,productId})=>{
  const response = await axios.delete(`http://localhost:3000/api/shop/cart/${userId}/${productId}`)

  return response.data
})
export const updateCartItems = createAsyncThunk('/cart/updateCartItems',async({userId,productId,quantity})=>{
  const response = await axios.put('http://localhost:3000/api/shop/cart/update-cart',{
    userId,productId,quantity
  })

  return response.data
})

const shoppingCartSlice= createSlice({
  name:'shoppingCart',
  initialState,
  reducers:{
     clearCart: (state) => {
    state.cart = null;
    state.cartItems = [];
  }
  },
  extraReducers:(builder)=>{
    builder.addCase(addToCart.pending,(state)=>{
      state.isLoading=true
    }).addCase(addToCart.fulfilled,(state,action)=>{
      state.isLoading=false
      state.cart = action.payload.data;
      state.cartItems=action.payload.data.items
    }).addCase(addToCart.rejected,(state)=>{
      state.isLoading=false
      state.cartItems=[]
    }).addCase(fetchCartItems.pending,(state)=>{
      state.isLoading=true
    }).addCase(fetchCartItems.fulfilled,(state,action)=>{
      state.isLoading=false
      state.cart = action.payload.data; 
      state.cartItems=action.payload.data.items
    }).addCase(fetchCartItems.rejected,(state)=>{
      state.isLoading=false
      // state.cartItems=[]
    }).addCase(updateCartItems.pending,(state)=>{
      state.isLoading=true
    }).addCase(updateCartItems.fulfilled,(state,action)=>{
      // console.log('Update Cart Payload:', action.payload);
      state.isLoading=false
      state.cart = action.payload.data;
      state.cartItems=action.payload.data
    }).addCase(updateCartItems.rejected,(state)=>{
      state.isLoading=false
      state.cartItems=[]
    }).addCase(deleteCartItem.pending,(state)=>{
      state.isLoading=true
    }).addCase(deleteCartItem.fulfilled,(state,action)=>{
      state.isLoading=false
      state.cart = action.payload.data;
      state.cartItems=action.payload.data
    }).addCase(deleteCartItem.rejected,(state)=>{
      state.isLoading=false
      state.cartItems=[]
    })
  }
})
export const { clearCart } = shoppingCartSlice.actions;


export default shoppingCartSlice.reducer