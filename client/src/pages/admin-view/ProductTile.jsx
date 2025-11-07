import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import React from 'react'

const ProductTile = ({product,setFormData ,handleDelete,setCurrentEditedId,setOpenCreateProductDialog}) => {
  return (
    <div className="w-full max-w-xs mx-auto bg-white shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg overflow-hidden">
  {/* Image */}
  <img
    src={product?.image}
    alt={product?.title}
    className="w-full h-48 object-cover"
  />

  {/* Content & Footer */}
  <div className="p-4 flex flex-col justify-between h-30">
    {/* Title & Price */}
    <div>
      <h2 className="text-lg font-semibold text-gray-900 truncate">{product.title}</h2>
      <p className="text-gray-700 mt-2">${product.price}</p>
    </div>

    {/* Buttons */}
    <div className="flex justify-between mt-0">
      <Button
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
        onClick={() => {
          setOpenCreateProductDialog(true)
          setCurrentEditedId(product?._id)
          setFormData(product)
        }}
      >
        Edit
      </Button>
      <Button
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition"
        onClick={() => handleDelete(product?._id)}
      >
        Delete
      </Button>
    </div>
  </div>
</div>

  )
}

export default ProductTile
