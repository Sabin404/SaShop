import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
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

function App() {
  const isAuthenticated = false;
  const user=null;

  return (
    <div className='flex flex-col overflow-hidden bg-white'>
      <Routes>
        <Route path='/auth' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <Layout/>
          </CheckAuth>
        }>
          <Route path='login' element={<Login/>} />
          <Route path='register' element={<Register/>} />
        </Route>
        <Route path='/admin' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <Admin/>
          </CheckAuth>  
        }>
          <Route path='dashboard' element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <Dashboard />
            </CheckAuth>
          } />
          <Route path='orders' element={<Orders/>}/>
          <Route path='products' element={<Products/>}/>
        </Route>

        <Route path='/shop' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <Shopping/>
          </CheckAuth>
        }>
          <Route path='home' element={<Home/>} />
          <Route path='listing' element={<Listing/>} />
          <Route path='checkout' e lement={<Checkout/>} />
          <Route path='account' element={<Account/>} />
        </Route>
        <Route path='*' element={<div>404 Not Found</div>} />
      </Routes>
    </div>
  )
}

export default App
