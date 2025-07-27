import { BadgeCheck, ChartNoAxesCombined, LayoutDashboard, Menu, ShoppingBasket } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';



const adminSideMenuItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: '/admin/dashboard',
    icon: <LayoutDashboard />
  },
  {
    id: 'products',
    label: 'Products',
    path: '/admin/products',
    icon: <ShoppingBasket />
  },
  {
    id: 'orders',
    label: 'Orders',
    path: '/admin/orders',
    icon: <BadgeCheck />
  }
]


function MenuItems({setOpen}) {
  const navigate = useNavigate();
  return <nav className='mt-8 flex-col flex gap-2 '>
    {
      adminSideMenuItems.map((menuItems) => (
        <div key={menuItems.id}
          onClick={() => {
            navigate(menuItems.path);
            setOpen ?setOpen(false) : null; 
          }}
          className='flex items-center gap-2 rounded-md px-3 py-2 cursor-pointer opacity-100 hover:bg-gray-200 hover:opacity-100 transition-all duration-200 ease-in-out'>
          {menuItems.icon}
          <span>{menuItems.label}</span>
        </div>
      ))
    }
  </nav>
}

const Sidebar = ({ open, setOpen }) => {
  const navigate = useNavigate();
  return (
    <div className=''>
      <Sheet open={open} onOpenChange={setOpen} >
        <SheetContent side='left' className='w-64 bg-gray-50'>
          <div className='flex flex-col h-full'>
            <SheetHeader className='border-b '>
              <SheetTitle className='flex gap-2 mt-5 mb-5' >
                <ChartNoAxesCombined size={30} className='mb-2' />
                <span className='text-xl font-extrabold'>Admin Panel</span>
              </SheetTitle>
            </SheetHeader>
            <MenuItems setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>
      <aside className='hidden w-64 flex-col border-r bg-background p-6 lg:flex'>
        <div className='flex items-center gap-2 cursor-pointer'
          onClick={() => navigate('/admin/dashboard')}>
          <ChartNoAxesCombined size={30} />
          <h1 className='text-xl font-extrabold'>Admin Panel</h1>
        </div>
        <MenuItems />
      </aside>
    </div>
  )
}

export default Sidebar
