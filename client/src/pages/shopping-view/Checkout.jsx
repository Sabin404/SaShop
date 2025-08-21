import React, { useState } from 'react'
import img from '../../assets/ban2.jpg'
import Address from '@/components/shopping-view/Address'
import { useDispatch, useSelector } from 'react-redux'
import CartItemsContent from '@/components/shopping-view/CartItemsContent'
import { Button } from '@/components/ui/button'
import { addNewOrder } from '@/store/shop/order-slice'

const Checkout = () => {

  const { cartItems ,cart} = useSelector(state => state.shopCart)
  const { user } = useSelector(state => state.auth)
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null)
  const { checkoutURL } = useSelector(state => state.shopOrder)
  const dispatch = useDispatch()
  const [isPaymentStart, setIsPaymentStart] = useState(false)
  console.log(cartItems);
  // console.log(cartItems?._id);
  // console.log(cartId);
  console.log(cart);
  
  
  

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

  function handleInitialPayment() {

    if(cartItems.length===0){
      alert("Empty Cart");
      return;
    }
    if (!currentSelectedAddress) {
      alert("Please select an address");
      return;
    }

    const orderData = {
      userId: user?.userId,
      cartId: cart?._id,
      cartItems: cartItems.map(item => ({
        productId: item.productId._id,
        title: item.productId.title,
        image: item.productId.image,
        price: item.productId.salePrice > 0 ? item.productId.salePrice : item.productId.price,
        quantity: item.quantity
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes
      },
      orderStatus: 'pending',
      paymentMethod: 'stripe',
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: '',
      payerId: "",
    }
    // console.log(orderData);

    dispatch(addNewOrder(orderData)).then((data) => {
      // console.log(data);
      if (data?.payload.success) {
        setIsPaymentStart(true)
      } else {
        setIsPaymentStart(false)
      }

    })
  }

  if (checkoutURL) {
    window.location.href = checkoutURL
  }



  // console.log(currentSelectedAddress);


  return (
    <div className='flex flex-col'>
      <div className='relative h-[300px] w-full overflow-hidden'>
        <img src={img} alt="Hi" className='h-full w-full object-center object-cover' />
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5'>
        <Address setCurrentSelectedAddress={setCurrentSelectedAddress} />
        <div className="flex flex-col gap-4">
          {
            cartItems && cartItems.length > 0 ?
              cartItems.map(item => <CartItemsContent cartItem={item} />)
              : null
          }
          <>
            <span className="font-bold">Total</span>
            <span className="font-bold">${totalCartAmount}</span>
          </>
          <div className='mt-4 w-full'>
            <Button className={'w-full'} onClick={handleInitialPayment}>Check out with paypal</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
