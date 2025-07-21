import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'

const Admin = () => {
  return (
    <div className='flex min-h-screen w-full bg-gray-100'>
      {/* admin side bar */}
      <Sidebar/>
      <div className='flex flex-1 flex-col'>
        {/* admin header */}
        <Header/>
        <main className='flex-1 flex bg-muted/40 p-4 md:p-6'>
          <Outlet/>
        </main>
      </div>
    </div>
  )
}

export default Admin
