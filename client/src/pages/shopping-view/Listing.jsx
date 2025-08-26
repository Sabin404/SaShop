import Filter from '@/components/shopping-view/Filter'
import ProductDetails from '@/components/shopping-view/ProductDetails'
import ProducTileShoping from '@/components/shopping-view/ProducTileShoping'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { sortOptions } from '@/config'
import { addToCart, fetchCartItems } from '@/store/shop/cart-slice'
import { fetchAllProductDetails, fetchAllProducts } from '@/store/shop/product-slice'
import { DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem } from '@radix-ui/react-dropdown-menu'
import { ArrowUpDownIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
const Listing = () => {
  const dispatch = useDispatch()

  const { productList, productDetails } = useSelector(state => state.shopProducts)
  const { user } = useSelector(state => state.auth)
  const { cartItems } = useSelector(state => state.shopCart)
  const [filters, setFilters] = useState({})
  const [sort, setSort] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const [open, setOpen] = useState(false)
  const categorySearchParams=searchParams.get('category')

  // const shopProducts = useSelector(state => state.shopProducts);
  // console.log('Redux shopProducts:', shopProducts);

  function createSearchParamsHelper(filterParams) {
    const queryParams = [];
    for (const [key, value] of Object.entries(filterParams)) {
      if (Array.isArray(value) && value.length > 0) {
        const paramValue = value.join(',');
        queryParams.push(`${key}=${encodeURIComponent(paramValue)}`)
      }
    }
    // console.log(queryParams);

    return queryParams.join('&');
  }

  useEffect(() => {
    if (filters !== null && sort !== null) {
      dispatch(fetchAllProducts({ filterParams: filters, sortParams: sort }))
    }
  }, [dispatch, sort, filters])

  useEffect(() => {
    if (productDetails !== null) setOpen(true)
  }, [productDetails])

  // console.log('productList:', productList)

  function handleSort(value) {
    setSort(value)
  }

  function handleGetProductDetails(getCurrentProductId) {
    // console.log(getCurrentProductId);
    dispatch(fetchAllProductDetails(getCurrentProductId))

  }

  function handleFilter(getSectionId, getCurrentOption) {
    // console.log(getCurrentOption,getSectionId);
    let cpyFilters = { ...filters };
    const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId)
    if (indexOfCurrentSection === -1) {
      cpyFilters = {
        ...cpyFilters,
        [getSectionId]: [getCurrentOption]
      }
    } else {
      const indexOfCurrentOption = cpyFilters[getSectionId].indexOf(getCurrentOption)
      if (indexOfCurrentOption === -1) {
        cpyFilters[getSectionId].push(getCurrentOption)
      } else {
        cpyFilters[getSectionId].splice(indexOfCurrentOption, 1)
      }
    }
    setFilters(cpyFilters)
    sessionStorage.setItem("Filters", JSON.stringify(cpyFilters))

  }

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



  useEffect(() => {
    setSort('price-lowtohigh')
    setFilters(JSON.parse(sessionStorage.getItem('Filters')) || {})
  }, [categorySearchParams])

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQueryString = createSearchParamsHelper(filters)
      setSearchParams(new URLSearchParams(createQueryString))
    }
  }, [filters])
  // console.log(filters,searchParams);
  // console.log(productDetails);
  // console.log(cartItems);

// console.log(productList);



  return (
    <div className='grid grid-cols-1 md:grid-cols-[300px_1fr] gap-5 p-4 md:p-6'>
      <Filter filters={filters} handleFilter={handleFilter} />
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className='p-4 border-b flex items-center shadow-2xs justify-between'>
          <h2 className='text-lg font-bold'>All products</h2>
          <div className="flex items-center gap-2">
            <span className='text-muted-foreground mr-2'>{productList.length}</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant={"outline"} size={'sm'} className="flex gap-1 items-center">
                  <ArrowUpDownIcon className='h-4 w-4' />
                  <span>Sort By</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end' className='w-[200px]'>
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map(sortItem => (
                    <DropdownMenuRadioItem key={sortItem.id} value={sortItem.id}>
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4'>
          {
            productList && productList.length > 0 ?
              productList.map(productItem =>
                <ProducTileShoping
                  handleGetProductDetails={handleGetProductDetails}
                  product={productItem}
                  handleAddToCart={handleAddToCart} />) : ''
          }
        </div>
      </div>
      <ProductDetails open={open} setOpen={setOpen} productDetails={productDetails} />
    </div>
  )
}

export default Listing
