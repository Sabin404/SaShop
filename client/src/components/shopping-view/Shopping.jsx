import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'

const Shopping = () => {
  return (
    <div className='flex flex-col bg-white overflow-hidden'>
      <Header />
      <main className='flex-col flex w-full'>
        <Outlet />
      </main>

    </div>
  )
}

export default Shopping
