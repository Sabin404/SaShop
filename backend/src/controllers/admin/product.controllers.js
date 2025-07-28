const { uploadImage } = require("../../helpers/cloudinary");

const handleImageUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const b64 = Buffer.from(req.file.buffer).toString('base64');
    const url = `data:${req.file.mimetype};base64,${b64}`;
    const result = await uploadImage(url);
    res.json({
      success: true,
      message: "Image uploaded successfully",
      url: result 
    });
  } catch (error) {
    console.error("Error in handleImageUpload:", error);
    res.status(500).json({ message: "Image upload failed" });
  }
};

module.exports = {
  handleImageUpload,
};
