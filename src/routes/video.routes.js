const express = require("express");
const { getAllVideos, createVideo, getOneVideo, searchVideo } = require("../controllers/video.controller");
const verifyToken = require('../middleware/validate.token')
const routerVideo = express.Router();

routerVideo.use(verifyToken)
routerVideo.route("/search").get(searchVideo)
routerVideo.route("/").get(getAllVideos).post(createVideo);
routerVideo.route('/:id').get(getOneVideo)

module.exports = routerVideo;
