import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { StarIcon } from "lucide-react";
import { Input } from "../ui/input";

import { addToCart } from "@/store/shop/cart-slice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { setProductDetails } from "@/store/shop/product-slice";
import StarRating from "../common/StarRating";
import { addReview, getReview } from "@/store/shop/review-slice";

const ProductDetails = ({ open, setOpen, productDetails }) => {
  const { cartItems } = useSelector(state => state.shopCart)
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)
  const { reviews } = useSelector(state => state.shopReview)
  const [reviewMsg, setReviewMsg] = useState('')
  const [rating, setRating] = useState(0)

  const handleRatingChange = (getRating) => {
    // console.log(getRating);
    setRating(getRating)
  }

  const handleAddReview = () => {
    dispatch(
      addReview({
        productId: productDetails?._id,
        userId: user?.userId,
        userName: user?.username,
        reviewMessage: reviewMsg,
        reviewValue: rating,
      })
    ).then((data) => {
      // console.log(data);

      if (data?.payload?.success) {
        toast.success(data.payload.message || "Review added successfully",{
          position:'top-center',
          duration:3000
          
        });
        dispatch(getReview(productDetails._id));
        setReviewMsg("");
        setRating(0);
      } else {
        toast.error(data?.payload?.message || "You need to buy product to review it",{
           position:'top-center',
          duration:3000
        });
      }
    });
  };

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
  const handleChange = () => {
    setOpen(false)
    dispatch(setProductDetails())
    setRating(0)
    setReviewMsg('')
  }

  useEffect(() => {
    if (productDetails !== null) dispatch(getReview(productDetails?._id))
  }, [productDetails])

  const avgReview = reviews && reviews.length > 0 ? reviews.reduce((sum, item) =>
    sum + item.reviewValue, 0) / reviews.length : 0

  const hasReviewed = reviews?.some(
    (r) => r.userId === user?.userId
  );
  // console.log(reviews);

  return (
    <Dialog
      open={open}
      onOpenChange={() => handleChange()}
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

            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center gap-1">
                <StarRating rating={avgReview} />
              </div>
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-md">
                {avgReview.toFixed(1)} / 5
              </span>
            </div>


            {/* Add to Cart Button */}
            {
              productDetails?.totalStock === 0 ?
                <Button
                  aria-label="Add product to cart"
                  className="w-full opacity-65 cursor-not-allowed
              sm:w-auto bg-black hover:bg-gray-800 text-white rounded-full py-3 px-6 font-semibold transition-colors shadow-md"
                >
                  Out of Stock
                </Button> :
                <Button
                  onClick={() => handleAddToCart(productDetails?._id, productDetails?.totalStock)}
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

            {/* Real Reviews */}
            {reviews?.length > 0 ? (
              <div className="space-y-5">
                {reviews.map((review, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    {/* User Initial Icon */}
                    <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center font-semibold text-lg text-gray-700 border border-gray-400">
                      {review.userName?.charAt(0).toUpperCase()}
                    </div>

                    {/* Review Content */}
                    <div className="flex flex-col">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {review.userName}
                      </h3>
                      <div className="flex mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <StarIcon
                            key={star}
                            size={18}
                            className={star <= review.reviewValue ? 'text-yellow-400' : 'text-gray-300'}
                            fill={star <= review.reviewValue ? 'yellow' : 'none'}
                          />
                        ))}
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {review.reviewMessage}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No reviews yet. Be the first to review!</p>
            )}


            {/* Review Form */}
            {!hasReviewed ? (
              <div className="mt-6 space-y-3">
                <Label>Write a review</Label>
                <StarRating rating={rating} handleRatingChange={handleRatingChange} />
                <Input
                  value={reviewMsg}
                  onChange={(e) => setReviewMsg(e.target.value)}
                  placeholder="Write your review..."
                />
                <Button
                  onClick={handleAddReview}
                  disabled={reviewMsg.trim() === "" || rating === 0}
                >
                  Submit Review
                </Button>
              </div>
            ) : (
              <p className="text-sm text-green-600 mt-4">
                You already submitted a review.
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetails;
