import multer from "multer";
import fs from "fs";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = "public/videos";

    // ✅ Check and create the directory if it doesn't exist
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    cb(null, dir);
  },

  filename: function (req, file, cb) {
    const date = new Date();
    const video = date.getTime() + "_" + file.originalname;
    req.body.video = video;
    cb(null, video);
  },
});

const uploadVideo = multer({ storage });

export default uploadVideo;
