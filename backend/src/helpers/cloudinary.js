const cloudinary = require('cloudinary').v2;
const multer = require('multer');



cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
})
// console.log("CLOUDINARY_API_KEY:", process.env.CLOUDINARY_API_SECRET);
// console.log("CLOUDINARY_CLOUD_NAME:", process.env.CLOUDINARY_CLOUD_NAME);
// console.log("CLOUDINARY_API_SECRET:", process.env.CLOUDINARY_URL);

const storage = new multer.memoryStorage();

async function uploadImage(file) {
  try {
    const result = await cloudinary.uploader.upload(file, {
      resource_type: 'auto',
    })
    return result;

  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    throw new Error("Image upload failed");

  }

}
const upload = multer({ storage });
module.exports = {
  upload,
  uploadImage,
}