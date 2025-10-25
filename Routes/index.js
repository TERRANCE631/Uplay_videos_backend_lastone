import { Router } from "express";
import { deleteLike, deleteSubs, deleteVideo, getComments, getLikes, GetSubscribers, getUsers, getUsersById, getVideos, Likes, LogIn, postComments, Register, Subscribers, userID, videoID, videos } from "../Handlers/index.js";

import upload from "../Uploads/Multer.js";
import uploadVideo from "../Uploads/VideoMulter.js";
import subsUpload from "../Uploads/SubsMulter.js";
export const AppRouter = Router();

// Get requests
AppRouter.get("/getUsername", getUsers);
AppRouter.get("/getVideos", getVideos);
AppRouter.get("/getLikes", getLikes);
AppRouter.get("/getSubs", GetSubscribers);
AppRouter.get("/getComments", getComments);
// Post requests
AppRouter.post("/register", upload.single("image"), Register)
AppRouter.post("/signIn", upload.single(" "), LogIn);
AppRouter.post("/likes", upload.single(" "), Likes);
AppRouter.post("/postComments", upload.single(" "), postComments);
AppRouter.post("/postSubs", subsUpload.single("profile_photo"), Subscribers);
AppRouter.post("/videos", uploadVideo.single("video"), videos);
// Get by ID requests
AppRouter.get("/GetUseId/:id", userID);
AppRouter.get("/VideoPlayer/:id", videoID);
AppRouter.get("/userprofile/:id", getUsersById);
// Delete by ID
AppRouter.delete("/deletelike/:id", deleteLike)
AppRouter.delete("/deleteSub/:id", deleteSubs)
AppRouter.delete("/deleteVideo/:id", deleteVideo)

export default AppRouter;