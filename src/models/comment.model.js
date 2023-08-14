const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    comment : {
      type: String,
      required: true,
    },
    videoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "videos",
      required: false,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("comments", commentSchema);
