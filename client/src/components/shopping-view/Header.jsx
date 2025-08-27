import { HouseIcon, LogOut, Menu, ShoppingCart, UserCog } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { useDispatch, useSelector } from 'react-redux'
import { shoppingViewHeaderItems } from '@/config'
import { Button } from '../ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '../ui/dropdown-menu'
// import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu'
import { logoutUser } from '@/store/auth-slice/authSlice'
import CartWrapper from './CartWrapper'
import { fetchCartItems } from '@/store/shop/cart-slice'
import { Label } from '../ui/label'


function MenuItem() {
  const[searchParams,setSeacrchParam]=useSearchParams()
  const navigate = useNavigate()
  const location = useLocation()
  const handleNavigate = (getCurr) => {
    sessionStorage.removeItem('Filters');
    const currentFilter = getCurr.id !== 'home' && getCurr.id!=='product' &&  getCurr.id!=='search' ?
      {
        category: [getCurr.id]
      } : null
    sessionStorage.setItem('Filters', JSON.stringify(currentFilter))
    location.pathname.includes('listing') 
    && currentFilter!== null ?
    setSeacrchParam(new URLSearchParams(`?category=${getCurr.id}`)): navigate(getCurr.path)
  }
  return (
    <nav className='flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row'>
      {
        shoppingViewHeaderItems.map(menuItem =>
          <Label key={menuItem.id}
            onClick={() => handleNavigate(menuItem)}
            className='text-sm font-medium'>{menuItem.label}</Label>)
      }

    </nav>
  )
}

function HeaderRightContent() {
  const { isAuthenticated, user } = useSelector(state => state.auth)
  // console.log(user);
  const { cartItems } = useSelector(state => state.shopCart)
  const [openCartSheet, setOpenCartSheet] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(logoutUser())
  }
  // console.log(cartItems);
  useEffect(() => {
    if (user?.userId && (!cartItems || cartItems.length === 0)) {
      dispatch(fetchCartItems(user.userId));
    }
  }, [dispatch, user?.userId]);
  // console.log(cartItems);
  return (
    <div className='flex items-center gap-4'>
      {/* Cart Button */}
      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)} >
        <Button
          onClick={() => setOpenCartSheet(true)}
          variant="outline" size="icon" className="relative">
          <ShoppingCart className='h-5 w-5' />
          <span className='sr-only'>User cart</span>
        </Button>
        <CartWrapper
        setOpenCartSheet={setOpenCartSheet}
         cartItems={
          cartItems && cartItems.length > 0
            ? cartItems
            : []
        } />
      </Sheet>

      {/* User Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className='focus:outline-none rounded-full overflow-hidden ring-2 ring-transparent hover:ring-primary transition-all'>
            <Avatar className='h-9 w-9 bg-black hover:cursor-pointer'>
              {/* <AvatarImage src={user.avatarUrl} alt={user.username} /> */}
              <AvatarFallback className='bg-primary text-white font-bold'>
                {user.username[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side='bottom' className='w-56 mt-[10px]'>
          <DropdownMenuLabel>
            Logged in as <span className="font-medium">{user.username}</span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer"
            onClick={() => navigate('/shop/account')}
          >
            <UserCog className='w-4 h-4 mr-2' />
            Account
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer"
            onClick={handleLogout}
          >
            <LogOut className='w-4 h-4 mr-2' />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
const Header = () => {
  const { isAuthenticated, user } = useSelector(state => state.auth)
  // console.log(user);

  return (
    <>
      <header className='sticky top-0 z-40 w-full border-b bg-background'>
        <div className='flex h-16 items-center justify-between px-4 md:px-6'>
          <Link className='flex items-center gap-2' to='/shop/home'>
            <HouseIcon className='h-6 w-6' />
            <span className='font-bold'>Ecommerce</span>
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <Button varient="outline" size="icon" className="lg:hidden">
                <Menu className='h-6 w-6' />
                <span className='sr-only'>Toggle</span>
              </Button>
            </SheetTrigger>
            <SheetContent side='left' className='w-full max-w-xs'>
              <MenuItem />
              <HeaderRightContent />
            </SheetContent>
          </Sheet>
          <div className='hidden lg:block'>
            <MenuItem />
          </div>
          <div className='hidden lg:block'>
            <HeaderRightContent />
          </div>
        </div>

      </header>
    </>
  )
}

export default Header
