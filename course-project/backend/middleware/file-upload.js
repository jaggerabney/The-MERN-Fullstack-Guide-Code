const multer = require("multer");
const uuid = require("uuid/v4");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const fileUpload = multer({
  limit: 500000,
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, "uploads/images");
    },
    filename: (req, file, callback) => {
      const fileExtension = MIME_TYPE_MAP[file.mimetype];

      callback(null, `${uuid()}.${fileExtension}`);
    },
  }),
  fileFilter: (req, file, callback) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    let error = isValid ? null : new Error("Invalid mimetype!");

    callback(error, isValid);
  },
});

module.exports = fileUpload;
