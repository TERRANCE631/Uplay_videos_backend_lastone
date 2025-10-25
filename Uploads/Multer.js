import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, "public/images")
    },

    filename: function (req, file, cb) {
        let date = new Date();
        let profile_image = date.getTime() + "_" + file.originalname;
        req.body.profile_image = profile_image;
        cb(null, profile_image);
    }
});
const upload = multer({ storage: storage });

export default upload;