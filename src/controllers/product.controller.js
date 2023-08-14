const asyncHandler = require("express-async-handler");
const productModel = require('../models/product.model')


//@Desc Get all product
//@route GET /products
//@access private

const getProductbyVideoId = asyncHandler(async (req, res) => {
  const videoId = req.params.videoId;
  const video = await productModel.find({ videoId });
  res.status(200).json(video);
});


//@Desc Create product
//@route POST /products
//@access private

  const createProduct = asyncHandler(async (req, res) => {
    const { titleProduct, Price, urlProduct, urlThumbnailProduct } = req.body;
  
    try {
      // const videoIdM = mongoose.Types.ObjectId();
      const videoId = req.params.videoId;
      // const cleanedId = videoId.substring(3);
  
      const newProduct = await productModel.create({
        titleProduct,
        Price,
        urlProduct,
        urlThumbnailProduct,
        videoId:videoId, // Jika Anda ingin mengaitkan produk dengan pengguna tertentu
      });
  
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(400).json({ message: "Failed create product", error: error.message });
    }
  });
  

module.exports = {getProductbyVideoId, createProduct}