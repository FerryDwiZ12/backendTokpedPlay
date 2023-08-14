const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  titleProduct: {
    type: String,
    required: true,
  },
  Price: {
    type: String,
    required: true,
  },
  urlProduct: {
    type: String,
    required: true,
  },
  urlThumbnailProduct: {
    type: String,
    required: true,
  },
  videoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "videos",
    required: false,
  },
});

module.exports = mongoose.model("products", productSchema);
