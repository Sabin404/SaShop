import React from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { brandOptionsMap, categoryOptionsMap } from '@/config'

const ProducTileShoping = ({ product, handleGetProductDetails, handleAddToCart }) => {
  // console.log(product);
  if (!product) return null;
  return (
 <div>
  <Card className="w-full max-w-xs mx-auto rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-all duration-300">
    
    {/* Image */}
    <div
      className="relative h-48 w-full cursor-pointer"
      onClick={() => handleGetProductDetails(product?._id)}
    >
      <img
        src={product?.image}
        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        alt={product?.title}
      />

      {/* Badges */}
      {product?.totalStock === 0 ? (
        <Badge className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 text-xs font-bold rounded-md shadow">
          Out of Stock
        </Badge>
      ) : product?.totalStock < 10 ? (
        <Badge className="absolute top-2 left-2 bg-yellow-400 text-black px-2 py-1 text-xs font-bold rounded-md shadow">
          Only {product?.totalStock} left
        </Badge>
      ) : product?.salePrice > 0 ? (
        <Badge className="absolute top-2 left-2 bg-green-600 text-white px-2 py-1 text-xs font-semibold rounded-md shadow">
          Sale
        </Badge>
      ) : null}
    </div>

    {/* Info & Button */}
    <div className="p-3 flex flex-col gap-2">
      {/* Product Name */}
      <h2 className="text-md font-semibold text-gray-900 line-clamp-2">
        {product?.title}
      </h2>

      {/* Brand & Category */}
      <div className="flex justify-between text-gray-500 text-xs">
        <span>{categoryOptionsMap[product?.category]}</span>
        <span>{brandOptionsMap[product?.brand]}</span>
      </div>

      {/* Price */}
      <div className="flex justify-between gap-2">
        <span className={`text-sm font-semibold ${product.salePrice > 0 ? 'line-through text-gray-400' : 'text-gray-900'}`}>
          ${product?.price}
        </span>
        {product.salePrice > 0 && (
          <span className="text-sm font-bold text-green-600">${product.salePrice}</span>
        )}
      </div>

      {/* Add to Cart Button */}
      {product?.totalStock === 0 ? (
        <Button className="w-full bg-gray-300 text-gray-700 py-1 rounded-md opacity-70 cursor-not-allowed text-sm">
          Out of Stock
        </Button>
      ) : (
        <Button
          className="w-full bg-black text-white py-1 rounded-md font-semibold text-sm hover:bg-gray-900 transition-all"
          onClick={() => handleAddToCart(product?._id, product?.totalStock)}
        >
          Add to Cart
        </Button>
      )}
    </div>
  </Card>
</div>




  )
}

export default ProducTileShoping
