import React, { useEffect } from 'react'
import Form from '@/components/common/Form'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { toast } from 'sonner'
import { addProductFormElements } from '@/config'
import Imageupload from '@/components/admin-view/Imageupload'
import { useDispatch, useSelector } from 'react-redux'
import { addNewProduct, deleteProduct, editProduct, fetchAllProducts } from '@/store/admin/product-slice'
import ProductTile from './ProductTile'

const initialFormData = {
  image: null,
  title: '',
  description: '',
  category: '',
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
  const [imageLoadingState, setImageLoadingState] = React.useState(false)
  const [currentEditedId, setCurrentEditedId] = React.useState(null)
  const { productList } = useSelector(state => state.adminProducts)
  const dispatch = useDispatch();
  function onSubmit(e) {
    e.preventDefault();
    currentEditedId !== null ?
      dispatch(editProduct({
        id: currentEditedId, formData
      })).then((data) => {
        console.log(data,"Edit");
        if(data?.payload?.success){
          dispatch(fetchAllProducts())
          setOpenCreateProductDialog(false)
          setFormData(initialFormData);
          toast.error(data?.payload?.message || "Product Edited successfully",
            {
              duration: 3000,
              position: 'top-center',
            }
          );
        }
      }) :
      dispatch(addNewProduct({
        ...formData,
        image: uploadedImageUrl.url
      })).then((data) => {
        if (data.payload.success) {
          dispatch(fetchAllProducts())
          setImageFile(null);
          setOpenCreateProductDialog(false)
          setFormData(initialFormData);
          toast.error(data?.payload?.message || "Product added successfully",
            {
              duration: 3000,
              position: 'top-center',
            }
          );
        }

      })

  }

   function validForm(){
   return Object.keys(formData).map(key=>formData[key]!=='').every(item=>item)
   }

   function handleDelete(getCurrentProductId){
    // console.log(getCurrentProductId);
    dispatch(deleteProduct(getCurrentProductId)).then(data=>{
      if(data?.payload?.success){
        dispatch(fetchAllProducts())
      }
    })

   }
  useEffect(() => {
    dispatch(fetchAllProducts())
  }, [dispatch])
  // console.log(productList, uploadedImageUrl,formData);

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
          {
            productList && productList.length > 0 ?
              productList.map(productItem => 
              <ProductTile
              handleDelete={handleDelete}
                setCurrentEditedId={setCurrentEditedId}
                product={productItem}
                setFormData={setFormData}
                setOpenCreateProductDialog={setOpenCreateProductDialog}
              />) : null
          }
        </div>
      </div>

      {/* Drawer for Add Product */}
      <Sheet
        open={openCreateProductDialog}
        onOpenChange={() => {
          setOpenCreateProductDialog(false)
          setCurrentEditedId(null)
          setFormData(initialFormData)
        }}>
        <SheetContent side="right" className="w-full max-w-md overflow-auto bg-white p-6 shadow-xl">
          <SheetHeader className="mb-4">
            <SheetTitle className="text-xl font-semibold text-gray-800 ">
              {currentEditedId == null ? "Add Product" : "Edit Product"}
            </SheetTitle>
          </SheetHeader>
          <Imageupload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            isEditMode={currentEditedId !== null}
          />
          <Form
            formData={formData}
            setFormData={setFormData}
            onSubmit={onSubmit}
            buttonText={currentEditedId == null ? "Add" : "Edit "}
            formControls={addProductFormElements}
            isBtnDisabled={!validForm()}
          />
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default Products
