import React from 'react'
import { Button } from '../ui/button'
import { AlignJustify, LogOut } from 'lucide-react'

const Header = ({setOpen}) => {
  return (
    <header className='flex items-center justify-between px-4 py-3 bg-background border-b'>
      {/* Menu button - visible only on small screens */}
      <Button onClick={() => setOpen(true)}
        className='block lg:hidden p-2'
        variant="ghost"
        size="icon"
      >
        <AlignJustify className='h-5 w-5' />
        <span className='sr-only'>Toggle menu</span>
      </Button>

      {/* Right-aligned logout button */}
      <div className='flex flex-1 justify-end'>
        <Button className='inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow'>
          <LogOut className='h-4 w-4' />
          Logout
        </Button>
      </div>
    </header>
  )
}

export default Header
