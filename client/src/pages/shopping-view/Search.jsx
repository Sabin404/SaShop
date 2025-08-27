import ProductDetails from '@/components/shopping-view/ProductDetails'
import ProducTileShoping from '@/components/shopping-view/ProducTileShoping'
import { Input } from '@/components/ui/input'
import { addToCart, fetchCartItems } from '@/store/shop/cart-slice'
import { fetchAllProductDetails } from '@/store/shop/product-slice'
import { getSearchResults } from '@/store/shop/search-slice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'

const Search = () => {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
  const [keyword, setKeyword] = useState('')
  const [searchParams, setSearchParams] = useSearchParams('')
  const dispatch = useDispatch()
  const { searchResults } = useSelector(state => state.shopSearch)
  const { cartItems } = useSelector(state => state.shopCart)
  const { user } = useSelector(state => state.auth)
  const { productDetails } = useSelector(state => state.shopProducts)


  function handleAddToCart(getCurrentProductId, getTotalStock) {
    const getCartItems = cartItems || [];

    const indexOfCurrItem = getCartItems.findIndex(
      item => item.productId?._id === getCurrentProductId
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

    dispatch(
      addToCart({
        userId: user?.userId,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then(data => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.userId));
        toast.success(data?.payload?.message || "Product added to Cart", {
          duration: 3000,
          position: 'top-center',
        });
      } else {
        toast.error(data?.payload?.message || "Failed to add product", {
          duration: 3000,
          position: 'top-center',
        });
      }
    });
  }
  function handleGetProductDetails(getCurrentProductId) {
    // console.log(getCurrentProductId);
    dispatch(fetchAllProductDetails(getCurrentProductId))

  }

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true)
  }, [productDetails])


  useEffect(() => {
    if (keyword && keyword.trim() !== '' && keyword.trim().length > 3) {
      setTimeout(() => {
        setSearchParams(new URLSearchParams(`?keyword=${keyword}`))
        dispatch(getSearchResults(keyword))
      }, 1000)
    }
  }, [keyword])
  // console.log(searchResults);

  return (
    <div className='container mx-auto md:px-6 px-4 py-8'>
      <div className="flex justify-center mb-8">
        <div className="w-full flex items-center">
          <Input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className={'py-8'}
            placeholder='Search Products' />
        </div>
      </div>
      <div>
        {
          searchResults && searchResults.length ?
            searchResults.map(product => <ProducTileShoping
              key={product._id}
              product={product}
              handleAddToCart={handleAddToCart}
              handleGetProductDetails={handleGetProductDetails}
            />) : <h1>No result found</h1>
        }
      </div>
      <ProductDetails
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails} />
    </div>
  )
}

export default Search
