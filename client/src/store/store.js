import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice/authSlice";
import AdminProductSlice from './admin/product-slice/index'
import shopProductSlice from './shop/product-slice/index'
const store = configureStore({  
  reducer:{
    auth:authReducer,
    adminProducts:AdminProductSlice,
    shopProducts:shopProductSlice
  }
})
export default store;