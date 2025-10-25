import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, "public/images")
    },

    filename: function (req, file, cb) {
        let date = new Date();
        let profile_photo = date.getTime() + "_" + file.originalname;
        req.body.profile_photo = profile_photo;
        cb(null, profile_photo);
    }
});
const subsUpload = multer({ storage: storage });

export default subsUpload;