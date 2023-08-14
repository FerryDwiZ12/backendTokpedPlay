const asyncHandler = require("express-async-handler");
const commentModel = require("../models/comment.model");
const { ObjectId } = require("mongoose").Types;

//@Desc Get all comments
//@route GET /comments
//@access private

const getCommentsbyVideoId = asyncHandler(async (req, res) => {
  const videoId = req.params.videoId;
  const comments = await commentModel.find({ videoId }).populate("userId","username urlPicture");
  res.status(200).json(comments);
});

//@Desc Create comments
//@route POST /comments
//@access private

const createComment = asyncHandler(async (req, res) => {
  const { comment } = req.body;

  try {
    const decodedToken = req.user;
    const userComment = decodedToken.user.id;
    // console.log("decode comment", decodedToken);

    // const userId = new ObjectId();
    const videoId = req.params.videoId;

    const newComment = await commentModel.create({
      comment,
      videoId: videoId,
      userId: userComment,
    });

    res.status(201).json(newComment);
  } catch (error) {
    res.status(400).json({ message: "Failed create comment", error: error.message });
  }
});

module.exports = { getCommentsbyVideoId, createComment };
