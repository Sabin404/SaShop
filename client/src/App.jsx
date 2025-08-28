import { useEffect, useState } from 'react'
import './App.css'
import { Button } from "@/components/ui/button";
import { Route, Routes } from 'react-router-dom';
import Layout from './components/auth/layout.jsx';
import Admin from './components/admin-view/Admin.jsx';
import Dashboard from './pages/admin-view/Dashboard';
import Products from './pages/admin-view/Products';
import Orders from './pages/admin-view/Orders';
import Shopping from './components/shopping-view/Shopping';
import Home from './pages/shopping-view/Home';
import Listing from './pages/shopping-view/Listing';
import Checkout from './pages/shopping-view/Checkout';
import Account from './pages/shopping-view/Account';
import CheckAuth from './components/common/CheckAuth';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from './store/auth-slice/authSlice';
import { Skeleton } from './components/ui/skeleton';
import StripeSuccess from './pages/shopping-view/StripeSuccess';
import StripeCancel from './pages/shopping-view/StripeCancel';
import OrderSuccess from './pages/shopping-view/OrderSuccess';
import Search from './pages/shopping-view/Search';

function App() {
  const { isAuthenticated, user, loading } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch])


  if (loading) {
    return <Skeleton className="h-[200px] w-[800px] bg-black " />
  }
  return (
    <div className='flex flex-col overflow-hidden bg-white'>
      <Routes>
        <Route
          path='/'
           element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            </CheckAuth>
          }

        />
        <Route path='/auth' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <Layout />
          </CheckAuth>
        }>
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
        </Route>
        <Route path='/admin' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <Admin />
          </CheckAuth>
        }>
          <Route path='dashboard' element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <Dashboard />
            </CheckAuth>
          } />
          <Route path='orders' element={<Orders />} />
          <Route path='products' element={<Products />} />
        </Route>

        <Route path='/shop' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <Shopping />
          </CheckAuth>
        }>
          <Route path='home' element={<Home />} />
          <Route path='listing' element={<Listing />} />
          <Route path='checkout' element={<Checkout />} />
          <Route path='search' element={<Search />} />
          <Route path='account' element={<Account />} />
          <Route path='stripe-success' element={<StripeSuccess />} />
          <Route path='stripe-cancel' element={<StripeCancel />} />
          <Route path='order-success' element={<OrderSuccess />} />
        </Route>
        <Route path='*' element={<div>404 Not Found</div>} />
      </Routes>
    </div>
  )
}

export default App
