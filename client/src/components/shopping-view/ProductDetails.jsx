import React from "react";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { StarIcon } from "lucide-react";
import { Input } from "../ui/input";

import { addToCart } from "@/store/shop/cart-slice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { setProductDetails } from "@/store/shop/product-slice";

const ProductDetails = ({ open, setOpen, productDetails }) => {
  const {cartItems}= useSelector(state=>state.shopCart)
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)

  
  const handleAddToCart = (getCurrentId, getTotalStock) => {
  const getCartItems = cartItems || [];

  const indexOfCurrItem = getCartItems.findIndex(
    item => item.productId?._id === getCurrentId
  );

  const currentQuantity = indexOfCurrItem > -1
    ? getCartItems[indexOfCurrItem].quantity
    : 0;

  const newQuantity = currentQuantity + 1;

  if (newQuantity > getTotalStock) {
    toast.error(`Only ${getTotalStock} items available. You've already added ${currentQuantity}.`, {
      duration: 3000,
      position: 'top-center',
    });
    return;
  }

  dispatch(addToCart({
    userId: user?.userId,
    productId: getCurrentId,
    quantity: 1
  })).then((data) => {
    if (data?.payload?.success) {
      toast.success(data.payload.message || "Product added successfully", {
        duration: 3000,
        position: "top-center",
      });
    } else {
      toast.error(data.payload.message || "Failed to add product", {
        duration: 3000,
        position: "top-center",
      });
    }
  });
};

  // console.log(productDetails);
  const handleChange=()=>{
    setOpen(false)
    dispatch(setProductDetails())
  }

  return (
    <Dialog
      open={open}
      onOpenChange={()=>handleChange()}
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40"
    >
      <DialogContent
        className="
          bg-white text-black rounded-2xl shadow-2xl
          max-w-[90vw] sm:max-w-[80vw] md:max-w-[700px]
          w-full
          grid grid-cols-1 md:grid-cols-2 gap-8 p-8
          overflow-hidden
        "
      >
        <DialogTitle className="sr-only">Product Details</DialogTitle>

        {/* Image */}
        <div className="rounded-lg overflow-hidden shadow-md cursor-pointer hover:scale-105 transition-transform duration-300">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Details & Reviews */}
        <div className="flex flex-col justify-between gap-6">
          <div>
            {/* Title and Description */}
            <h1 className="text-3xl font-extrabold text-gray-900 mb-3">
              {productDetails?.title}
            </h1>
            <p className="text-gray-600 text-base leading-relaxed mb-6">
              {productDetails?.description}
            </p>

            {/* Price */}
            {productDetails?.price && (
              <div className="flex items-center gap-4 mb-6">
                <p
                  className={`text-2xl font-semibold ${productDetails?.salePrice > 0
                      ? "text-gray-400 line-through"
                      : "text-green-600"
                    }`}
                >
                  ${Number(productDetails.price).toFixed(2)}
                </p>
                {productDetails?.salePrice > 0 && (
                  <p className="text-2xl font-bold text-green-600">
                    ${Number(productDetails.salePrice).toFixed(2)}
                  </p>
                )}
              </div>
            )}

            {/* Add to Cart Button */}
            {
              productDetails?.totalStock===0 ?
              <Button
              aria-label="Add product to cart"
              className="w-full opacity-65 cursor-not-allowed
              sm:w-auto bg-black hover:bg-gray-800 text-white rounded-full py-3 px-6 font-semibold transition-colors shadow-md"
            >
              Out of Stock
            </Button> :
            <Button
              onClick={() => handleAddToCart(productDetails?._id,productDetails?.totalStock)}
              aria-label="Add product to cart"
              className="w-full sm:w-auto bg-black hover:bg-gray-800 text-white rounded-full py-3 px-6 font-semibold transition-colors shadow-md"
            >
              Add to Cart
            </Button>
            }
            
          </div>

          {/* Reviews Section */}
          <div className="mt-8 max-h-56 overflow-y-auto border-t border-gray-200 pt-6">
            <h2 className="text-xl font-bold text-gray-900 mb-5">Reviews</h2>

            {/* Hardcoded Reviews */}
            <div className="space-y-5">
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center font-semibold text-lg text-gray-700 border border-gray-400">
                  A
                </div>
                <div className="flex flex-col">
                  <h3 className="font-semibold text-gray-900 mb-1">Alice</h3>
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} size={18} fill="yellow" />
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Great product! Highly recommend.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center font-semibold text-lg text-gray-700 border border-gray-400">
                  J
                </div>
                <div className="flex flex-col">
                  <h3 className="font-semibold  mb-1">John</h3>
                  <div className="flex  mb-2">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon fill='yellow' key={i} size={18} />
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Fantastic quality. Worth the price!
                  </p>
                </div>
              </div>
            </div>

            {/* Review Form */}
            <div className="mt-6 flex flex-col gap-3">
              <Label htmlFor="reviewMsg" className="font-semibold text-gray-900">
                Write a review
              </Label>
              <div className="flex items-center gap-2">
                {/* Static 5 stars (you can make it interactive later) */}
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className="text-yellow-400 cursor-pointer"
                    size={20}
                  />
                ))}
              </div>
              <Input
                id="reviewMsg"
                name="reviewMsg"
                placeholder="Write a review..."
                className="rounded-md border border-gray-300 "
              />
              <Button className='bg-black text-white'>
                Submit
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetails;
