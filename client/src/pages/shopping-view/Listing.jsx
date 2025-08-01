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
  //fetch products
  const {productList=[]} = useSelector(state => state.shopProducts || {} )
  useEffect(() => {
    dispatch(fetchAllProducts())
  }, [dispatch])

  console.log(productList);
  
  
  return (
    <div className='grid grid-cols-1 md:grid-cols-[300px_1fr] gap-5 p-4 md:p-6'>
      <Filter />
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className='p-4 border-b flex otems-center shadow-2xs'>
          <h2 className='text-lg font-bold'>
            All products
          </h2>
          <div className="flex items-center gap-2">

            <span className='text-muted-foreground mr-2'>10 products</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant={"outline"} size={'sm'} className="flex gap-1 items-center">
                  <ArrowUpDownIcon className='h-4 2-4' />
                  <span>Sort By</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end' className='w-[200px]'>
                <DropdownMenuRadioGroup>
                  {sortOptions.map(sortItem => <DropdownMenuRadioItem key={sortItem.id}>
                    {sortItem.label}
                  </DropdownMenuRadioItem>)}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4'>

        </div>
      </div>

    </div>
  )
}

export default Listing
