import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice/authSlice";
import AdminProductSlice from './admin/product-slice/index'
import adminOrderSlice from './admin/order-slice/index'
import shopProductSlice from './shop/product-slice/index'
import shopCartSlice from './shop/cart-slice/index'
import shopAddressSlice from './shop/address-slice/index'
import shopOrderSlice from './shop/order-slice/index'
const store = configureStore({  
  reducer:{
    auth:authReducer,
    adminProducts:AdminProductSlice,
    adminOrder:adminOrderSlice,
    shopProducts:shopProductSlice,
    shopCart:shopCartSlice,
    shopAddress:shopAddressSlice,
    shopOrder:shopOrderSlice,

  }
})
export default store;