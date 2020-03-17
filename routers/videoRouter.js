import express from "express";
import routes from "../routes"
import {uploadVideo, onlyPrivate} from "../middlewares"
const videoRouter = express.Router();
import {
    videos,
    getUpload,
    postUpload,
    videoDetail,
    getEditVideo,
    postEditVideo,
    deleteVideo,
  } from "../controllers/videoController";

// videoRouter.get(routes.videos, videos);
videoRouter.get(routes.upload,onlyPrivate, getUpload);
videoRouter.post(routes.upload,onlyPrivate,uploadVideo,postUpload);

videoRouter.get(routes.videoDetail(), videoDetail);

videoRouter.get(routes.editVideo(),onlyPrivate, getEditVideo);
videoRouter.post(routes.editVideo(),onlyPrivate, postEditVideo);

videoRouter.get(routes.deleteVideo(),onlyPrivate, deleteVideo);

export default videoRouter;