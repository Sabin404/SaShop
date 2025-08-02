import Filter from '@/components/shopping-view/Filter'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { sortOptions } from '@/config'
import { fetchAllProducts } from '@/store/shop/product-slice'
import { DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem } from '@radix-ui/react-dropdown-menu'
import { ArrowUpDownIcon } from 'lucide-react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Listing = () => {
  const dispatch = useDispatch()

  // Fix fallback to {} instead of []
  const { productList  } = useSelector(state => state.shopProducts )

  const shopProducts = useSelector(state => state.shopProducts);
console.log('Redux shopProducts:', shopProducts);

  useEffect(() => {
    dispatch(fetchAllProducts())
  }, [dispatch])

  // console.log('productList:', productList)

  return (
    <div className='grid grid-cols-1 md:grid-cols-[300px_1fr] gap-5 p-4 md:p-6'>
      <Filter />
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
                <DropdownMenuRadioGroup>
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
          {/* Render product items */}
          {productList.map(product => (
            <div key={product._id} className="border rounded p-4 shadow-sm">
              <img src={product.image} alt={product.title} className="w-full h-40 object-cover rounded" />
              <h3 className="mt-2 font-semibold">{product.title}</h3>
              <p className="text-muted-foreground">Rs. {product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Listing
