import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import { Minus, Plus, Trash } from "lucide-react";
import { deleteCartItem, fetchCartItems, updateCartItems } from "@/store/shop/cart-slice";
import { toast } from "sonner";

const CartItemsContent = React.memo(({ cartItem }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);

  // console.log(user.id);
  
  if (!cartItem) return null;

  // product details nested inside productId
  const product = cartItem.productId;
  // console.log(cartItem);
  
  // console.log(product.totalStock);
  
  if (!product) return null;

  const price = Number(product?.salePrice) > 0 ? Number(product.salePrice) : Number(product?.price || 0);
  const quantity = Number(cartItem?.quantity) || 1;
  const total = isNaN(price) || isNaN(quantity) ? "0.00" : (price * quantity).toFixed(2);

  const userId = user?.userId;
  // console.log(user);
  

  const handleCartItemDelete = async () => {
    if (!userId || !product._id) return;

    const result = await dispatch(deleteCartItem({ userId, productId: product._id }));
    if (result?.payload?.success) {
      toast.success(result.payload.message || "Cart item deleted successfully", {
        duration: 3000,
        position: "top-center",
      });
      dispatch(fetchCartItems(userId));
    }
  };

  const handleCartQuantity = (cartItem, action) => {
    console.log("userId:", userId, "productId:", product?._id);
    if (!userId || !product._id) return;

    const currentQuantity = Number(cartItem?.quantity) || 1;
    const totalStock = Number(product?.totalStock) || 0;

    let updatedQuantity = currentQuantity;
    // console.log(currentQuantity,totalStock);
    

    if (action === "plus") {
      if (currentQuantity + 1 > totalStock) {
        toast.error(
          `Only ${totalStock} items available. You've already added ${currentQuantity}.`,
          {
            duration: 3000,
            position: "top-center",
          }
        );
        return;
      }
      updatedQuantity = currentQuantity + 1;
    }

    if (action === "minus") {
      updatedQuantity = Math.max(1, currentQuantity - 1);
    }

    dispatch(updateCartItems({
      userId,
      productId: product._id,
      quantity: updatedQuantity,
    })).then((data) => {
      if (data?.payload?.success) {
        toast.success(data.payload.message || "Cart updated successfully", {
          duration: 3000,
          position: "top-center",
        });
        dispatch(fetchCartItems(userId));
      }
    });
  };


  // console.log(cartItem);


  return (
    <div className="flex items-center space-x-3 p-3 border-b-2  ">
      <img src={product?.image} alt={product?.title} className="w-20 h-20 rounded object-cover" />

      <div className="flex-1">
        <h3 className="font-bold uppercase text-center">{product?.title}</h3>

        <div className="flex items-center mt-1 gap-2 justify-evenly ">
          <Button
            disabled={quantity === 1}
            onClick={() => handleCartQuantity(cartItem, "minus")}
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
          >
            <Minus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>

          <span className="font-semibold">{quantity}</span>

          <Button
            onClick={() => handleCartQuantity(cartItem, "plus")}
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
          >
            <Plus className="w-4 h-4" />
            <span className="sr-only">Increase</span>
          </Button>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <p className="font-semibold">${total}</p>

        <Trash
          onClick={handleCartItemDelete}
          className="cursor-pointer mt-1"
          size={20}
          color="red"
        />
      </div>
    </div>
  );
});

export default CartItemsContent;
