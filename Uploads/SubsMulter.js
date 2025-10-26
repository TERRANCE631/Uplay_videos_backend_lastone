import multer from "multer";
import fs from "fs";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = "public/images";

    // ✅ Ensure the folder exists
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    cb(null, dir);
  },

  filename: function (req, file, cb) {
    const date = new Date();
    const profile_photo = date.getTime() + "_" + file.originalname;
    req.body.profile_photo = profile_photo;
    cb(null, profile_photo);
  },
});

const subsUpload = multer({ storage });

export default subsUpload;
