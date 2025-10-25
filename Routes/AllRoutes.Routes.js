import { Router } from "express";

import upload from "../Uploads/Multer.js";
import uploadVideo from "../Uploads/VideoMulter.js";
import subsUpload from "../Uploads/SubsMulter.js";
import { checkAuth, getUsers, getUsersById, LogIn, logout, Register, userID } from "../Controllers/Auth.Controller.js";
import { deleteSubs, GetSubscribers, Subscribers } from "../Controllers/Subscribers.Controller.js";
import { deleteVideo, getVideos, videoID, videos } from "../Controllers/Video.Controller.js";
import { deleteLike, getLikes, Likes } from "../Controllers/Likes.Controller.js";
import { getComments, postComments } from "../Controllers/Comments.Controller.js";
import { protectRoute } from "../Middlewares/Auth.middleware.js";

export const AppRouter = Router();

// Get requests
AppRouter.get("/getUsername", getUsers);
AppRouter.get("/getVideos", getVideos);
AppRouter.get("/getLikes", getLikes);
AppRouter.get("/getSubs", GetSubscribers);
AppRouter.get("/getComments", getComments);
AppRouter.get("/logout", logout);

// Post requests
AppRouter.post("/register", upload.single("image"), Register);
AppRouter.post("/signIn", LogIn);
AppRouter.post("/likes", Likes);
AppRouter.post("/postComments", postComments);
AppRouter.post("/postSubs", subsUpload.single("profile_photo"), Subscribers);
AppRouter.post("/videos", uploadVideo.single("video"), videos);

// Get by ID requests
AppRouter.get("/GetUseId/:id", userID);
AppRouter.get("/VideoPlayer/:id", videoID);
AppRouter.get("/userprofile/:id", getUsersById);

// Delete by ID
AppRouter.delete("/deletelike/:id", deleteLike);
AppRouter.delete("/deleteSub/:id", deleteSubs);
AppRouter.delete("/deleteVideo/:id", deleteVideo);

// Verifying user
AppRouter.get("/checkAuth", protectRoute, checkAuth);

export default AppRouter;