import React from 'react'
import { SheetContent, SheetHeader, SheetTitle } from '../ui/sheet'

const CartWrapper = () => {
  return (
    <SheetContent className='bg-white'>
      <SheetHeader>
        <SheetTitle>
          Your Cart
        </SheetTitle>
      </SheetHeader>
    </SheetContent>
  )
}

export default CartWrapper
