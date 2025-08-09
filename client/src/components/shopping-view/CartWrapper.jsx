import React from 'react';
import { SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';
import { Button } from '../ui/button';
import CartItemsContent from './CartItemsContent';
import { useSelector } from 'react-redux';
import { Skeleton } from '../ui/skeleton';

const CartWrapper = ({ cartItems }) => {
  const { isLoading } = useSelector(state => state.shopCart);

  // Calculate total cart amount
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

  // Determine number of skeleton rows to render:
  // If cartItems exist, use their count, otherwise default to 3
  const skeletonCount = cartItems && cartItems.length > 0 ? cartItems.length : 0;

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>

      <div className="mt-8 space-y-4">
        {isLoading ? (
          // Render skeleton rows equal to cartItems count or default 3
          <>
            {[...Array(skeletonCount)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4 animate-pulse">
                <Skeleton className="w-20 h-20 rounded bg-gray-300" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-6 w-3/4 bg-gray-300" />
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-8 w-8 rounded-full bg-gray-300" />
                    <Skeleton className="h-6 w-6 bg-gray-300" />
                    <Skeleton className="h-8 w-8 rounded-full bg-gray-300" />
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <Skeleton className="h-6 w-16 bg-gray-300" />
                  <Skeleton className="h-6 w-6 rounded-full bg-gray-300" />
                </div>
              </div>
            ))}
          </>
        ) : cartItems && cartItems.length > 0 ? (
          cartItems.map(item => (
            <CartItemsContent
              key={item._id || item.productId?._id || item.productId}
              cartItem={item}
            />
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>

      <div className="mt-8 space-y-4">
        <div className="flex justify-between items-center">
          {isLoading ? (
            <>
              <Skeleton className="h-6 w-16 bg-gray-300" />
              <Skeleton className="h-6 w-20 bg-gray-300" />
            </>
          ) : (
            <>
              <span className="font-bold">Total</span>
              <span className="font-bold">${totalCartAmount}</span>
            </>
          )}
        </div>
      </div>


      <Button className="w-full mt-6" disabled={isLoading}>
        Checkout
      </Button>
    </SheetContent>
  );
};

export default CartWrapper;
