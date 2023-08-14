const express = require("express");
const { getCommentsbyVideoId, createComment } = require("../controllers/comment.controller");
const verifyToken = require("../middleware/validate.token");
const routerComment = express.Router();

routerComment.use(verifyToken);

// routerComment.route("/").get(getCommentsbyVideoId)
routerComment.route('/:videoId').get(getCommentsbyVideoId).post(createComment);
module.exports = routerComment;
