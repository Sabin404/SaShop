import React from 'react'
import img from '../../assets/ban2.jpg'
import Address from '@/components/shopping-view/Address'
import { useSelector } from 'react-redux'
import CartItemsContent from '@/components/shopping-view/CartItemsContent'
import { Button } from '@/components/ui/button'

const Checkout = () => {

  const { cartItems } = useSelector(state => state.shopCart)
  // console.log(cartItems);
  
  const totalCartAmount = cartItems && cartItems.length > 0
    ? cartItems.reduce((sum, currentItem) => {
      const product = currentItem?.productId;
      const price = Number(product?.salePrice) > 0
        ? Number(product.salePrice)
        : Number(product?.price || 0);
      const quantity = Number(currentItem?.quantity || 0);
      return sum + price * quantity;
    }, 0).toFixed(2)
    : '0.00';
  return (
    <div className='flex flex-col'>
      <div className='relative h-[300px] w-full overflow-hidden'>
        <img src={img} alt="Hi" className='h-full w-full object-center object-cover' />
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5'>
        <Address />
        <div className="flex flex-col gap-4">
          {
            cartItems  && cartItems.length > 0 ?
              cartItems.map(item => <CartItemsContent cartItem={item} />)
              : null
          }
          <>
            <span className="font-bold">Total</span>
            <span className="font-bold">${totalCartAmount}</span>
          </>
        <div className='mt-4 w-full'>
          <Button className={'w-full'}>Check out with paypal</Button>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
