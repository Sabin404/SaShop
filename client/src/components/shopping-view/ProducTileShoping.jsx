import React from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { brandOptionsMap, categoryOptionsMap } from '@/config'

const ProducTileShoping = ({ product, handleGetProductDetails, handleAddToCart }) => {
  // console.log(product);
if (!product) return null;
  return (
    <div >
      <Card className='w-full max-w-sm mx-auto'>
        <div onClick={() => handleGetProductDetails(product?._id)}>
          <div className='relative '>
            <img
              src={product?.image}
              className='w-full h-[300px] object-cover rounded-t-lg'
            />
            {product?.totalStock === 0 ? (
              <Badge className='absolute top-2 left-2 bg-red-500 hover:bg-red-700'>
                Out of Stock
              </Badge>
            ) : product?.totalStock < 10 ? (
              <Badge className='absolute top-2 left-2 bg-yellow-500 hover:bg-yellow-700'>
                Only {product?.totalStock} left
              </Badge>
            ) : product?.salePrice > 0 ? (
              <Badge className='absolute top-2 left-2 bg-green-500 hover:bg-green-700'>
                Sale
              </Badge>
            ) : null}

          </div>
          <CardContent className={'p-4'}>
            <h2 className='text-xl font-bold mb-2'>{product?.title}</h2>
            <div className='flex justify-between items-center mb-2'>
              <span className='text-sm'>{categoryOptionsMap[product?.category]}</span>
              <span className='text-sm'>{brandOptionsMap[product?.brand]}</span>
            </div>
            <div className='flex justify-between items-center mb-2'>
              <span className={`font-semibold text-primary ${product.salePrice > 0 ? 'line-through' : ''}`}>${product?.price}</span>
              {
                product.salePrice > 0 ? <span className='text-sm'>${product.salePrice}</span> : ''
              }

            </div>
          </CardContent>
        </div>
        <CardFooter>
          {
            product?.totalStock === 0 ?
              <Button className='bg-black text-white hover:cursor-pointer opacity-65 cursor-not-allowed'
              >Out of Stock</Button> :
              <Button className='bg-black text-white hover:cursor-pointer'
                onClick={() => handleAddToCart(product?._id,product?.totalStock)}
              >Add to Cart</Button>
          }

        </CardFooter>
      </Card>
    </div>
  )
}

export default ProducTileShoping
