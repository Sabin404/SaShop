import React from 'react'
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="min-h-screen w-full grid lg:grid-cols-2">
      {/* Left Section */}
      <div className="hidden lg:flex flex-col justify-center items-center bg-black text-white p-10">
        <h1 className="text-5xl font-bold mb-4">Welcome </h1>
        <p className="text-lg opacity-80 max-w-md text-center">
          Sign in or create an account to shop effortlessly.
        </p>
      </div>


      {/* Right Section */}
      <div className="flex flex-col justify-center items-center p-8 bg-background">
        <Outlet />
      </div>
    </div>
  )
}

export default Layout;
