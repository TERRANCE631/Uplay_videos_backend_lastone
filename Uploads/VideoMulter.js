import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, "public/videos")
    },

    filename: function (req, file, cb) {
        let date = new Date();
        let video = date.getTime() + "_" + file.originalname;
        req.body.video = video;
        cb(null, video);
    }
});
const uploadVideo = multer({ storage: storage });

export default uploadVideo;