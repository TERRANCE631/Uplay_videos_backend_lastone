import multer from "multer";
import fs from "fs";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = "public/images";

    // ✅ Check if folder exists, if not, create it
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    cb(null, dir);
  },

  filename: function (req, file, cb) {
    const date = new Date();
    const profile_image = date.getTime() + "_" + file.originalname;
    req.body.profile_image = profile_image;
    cb(null, profile_image);
  },
});

const upload = multer({ storage });

export default upload;
