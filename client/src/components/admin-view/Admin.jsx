import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'

const Admin = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen w-full bg-gray-100">
      {/* Sidebar: hidden on small screens, toggleable */}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen}  />

      {/* Main content area */}
      <div className="flex flex-1 flex-col">
        {/* Header with sidebar toggle on mobile */}
        <Header setOpen={setSidebarOpen} />

        {/* Main content */}
        <main className="flex-1 flex bg-muted/40 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Admin
