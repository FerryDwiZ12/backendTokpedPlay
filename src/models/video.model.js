const mongoose = require("mongoose");

const videoSchema = mongoose.Schema({
  storeName: {
    type: String,
    required: true,
  },
  urlVideo: {
    type: String,
    required: true,
  },
  titleVideo: {
    type: String,
    required: true,
  },
  urlVideoThumbnail: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: false,
  },
});

module.exports = mongoose.model("videos", videoSchema);
