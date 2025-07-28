import React, { useEffect } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { FileIcon, UploadCloudIcon, XIcon } from 'lucide-react'
import { Button } from '../ui/button'
import axios from 'axios'

const Imageupload = ({
  imageFile,
  setImageFile,
  uploadedImageUrl,
  setUploadedImageUrl,
  imageLoadingState,
  setImageLoadingState
}) => {
  const inputRef = React.useRef(null)

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setImageFile(selectedFile)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const droppedFile = e.dataTransfer.files?.[0]
    if (droppedFile) {
      setImageFile(droppedFile)
    }
  }

  const handleRemoveImage = () => {
    setImageFile(null)
    if (inputRef.current) {
      inputRef.current.value = ""
    }
  }

  async function uploadImageToCloudinary() {
    setImageLoadingState(true)
    try {
      
      const data = new FormData();
      data.append('image', imageFile);
      const response = await axios.post('http://localhost:3000/api/admin/products/upload-image', data);

      if (response?.data?.url) {
        setUploadedImageUrl(response.data.url);
        console.log("Image uploaded");
        // console.log(response.data.url.url);
        setImageLoadingState(false)
        
        
      }
    } catch (error) {
      console.error("Upload failed:", error.response?.data || error.message);
    }
  }

  useEffect(() => {
    if (imageFile !== null) uploadImageToCloudinary();
  }, [imageFile]);
  // console.log("imageFile:", imageFile)

  return (
    <div className="w-full max-w-md mx-auto mt-4">
      <Label className="text-lg font-semibold mb-2 block">Upload an Image</Label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="border-2 border-dashed rounded-lg p-4"
      >
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleFileChange}
        />

        {!imageFile ? (
          <Label htmlFor="image-upload">
            <div className="flex flex-col items-center justify-center h-32 cursor-pointer w-full">
              <UploadCloudIcon className="w-8 h-8 text-gray-500 mb-2" />
              <span className="text-gray-500">Drag & Drop or Click to Upload Image</span>
            </div>
          </Label>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileIcon className="w-8 h-8 text-primary mr-2" />
              <p className="text-sm font-medium">{imageFile.name}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleRemoveImage}
              className="ml-2 text-muted-foreground"
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Imageupload
