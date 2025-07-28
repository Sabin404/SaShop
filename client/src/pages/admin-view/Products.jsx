import React from 'react'
import Form from '@/components/common/Form'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { addProductFormElements } from '@/config'
import Imageupload from '@/components/admin-view/Imageupload'

const initialFormData = {
  image: null,
  title: '',
  description: '',
  catagory: '',
  price: '',
  brand: '',
  salePrice: '',
  totalStock: '',
}

const Products = () => {
  const [openCreateProductDialog, setOpenCreateProductDialog] = React.useState(false)
  const [formData, setFormData] = React.useState(initialFormData)

  const [imageFile, setImageFile] = React.useState(null)
  const [uploadedImageUrl, setUploadedImageUrl] = React.useState(null)
  const [imageLoadingState ,setImageLoadingState]=React.useState(false)

  function onSubmit() {
  }
console.log(formData);

  return (
    <div className="w-full px-4 py-6 md:px-8">
      {/* Page Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold tracking-tight text-gray-800">
          Products
        </h2>
        <Button
          onClick={() => setOpenCreateProductDialog(true)}
          className="bg-gray-300 cursor-pointer hover:bg-primary/90 transition-all"
        >
          + Add New Product
        </Button>
      </div>

      {/* Products Grid Placeholder */}
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {/* Replace this with product cards */}
        <div className="col-span-full text-center text-gray-500">
          No products available.
        </div>
      </div>

      {/* Drawer for Add Product */}
      <Sheet open={openCreateProductDialog} onOpenChange={setOpenCreateProductDialog}>
        <SheetContent side="right" className="w-full max-w-md overflow-auto bg-white p-6 shadow-xl">
          <SheetHeader className="mb-4">
            <SheetTitle className="text-xl font-semibold text-gray-800">
              Add New Product
            </SheetTitle>
          </SheetHeader>
          <Imageupload 
          imageFile={imageFile} 
          setImageFile={setImageFile}
           uploadedImageUrl={uploadedImageUrl} 
           setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
           />
          <Form
            formData={formData}
            setFormData={setFormData}
            onSubmit={onSubmit}
            buttonText="Add Product"
            formControls={addProductFormElements}
          />
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default Products
