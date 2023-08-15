const asyncHandler = require("express-async-handler");
const videoModel = require("../models/video.model");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

//@Desc Get all Videos
//@route GET /videos
//@access private

const getAllVideos = asyncHandler(async (req, res) => {
  const videos = await videoModel.find();
  res.status(200).json(videos);
});

//@Desc Get one video
//@route GET /video
//@access private

const getOneVideo = asyncHandler(async (req, res) => {
  try {
    const video = await videoModel.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }
    res.json(video);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//@Desc Create new video
//@route POST
//@access private

const createVideo = asyncHandler(async (req, res) => {
  const { storeName, urlVideo, titleVideo, urlVideoThumbnail } = req.body;

  try {
    // const userId = new ObjectId();
    const decodedToken = req.user;
    const userCreateVideo = decodedToken.user.id;

    const newVideo = await videoModel.create({
      storeName,
      urlVideo,
      titleVideo,
      urlVideoThumbnail,
      userId: userCreateVideo,
    });

    res.status(201).json(newVideo);
  } catch (error) {
    res.status(400).json({ message: "Failed to create video", error: error.message });
  }
});

const searchVideo = asyncHandler(async (req, res) => {
  try {
    const toLowerCast = req.query.q.toLowerCase();
    const video = await videoModel.find({
      titleVideo: { $regex: toLowerCast, $options: "i" },
    });

    if (!video) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(video);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



module.exports = { getAllVideos, createVideo, getOneVideo, searchVideo };
