const cloudinary = require("../configs/cloudinary");

const signUpload = async (req, res)=>{
  try {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const paramsToSign = {
      timestamp,
      folder: "ordorra_signed_uploads",
    };

    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET
    );

    res.json({
      timestamp,
      signature,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
      folder: "ordorra_signed_uploads",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Signature generation failed" });
  }
}
const deleteImage = async (req, res)=>{
  try {
    const { public_id } = req.body;
    if (!public_id)
      return res.status(400).json({ error: "Missing public_id" });

    await cloudinary.uploader.destroy(public_id);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete image" });
  }
}

module.exports = {
    signUpload,
    deleteImage
}