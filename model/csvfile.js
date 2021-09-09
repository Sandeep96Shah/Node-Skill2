const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const CSVFILE_PATH = path.join('/uploads');

const csvfileSchema = new mongoose.Schema({
  filepath: {
    type: String,
    required: true,
  },
  filename: {
    type: String,
    reuired: true,
  },
});

// function to upload file using multer
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", CSVFILE_PATH));
  },
  filename: function (req, file, cb){
    // checking if the uploaded file is of type .csv or not
    if (path.extname(file.originalname) == ".csv")
      cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});

// static to make them available for others
csvfileSchema.statics.uploadcsvfile = multer({ storage: storage }).single("csvfile");
csvfileSchema.statics.csvfilepath = CSVFILE_PATH;

const CSVFILE = mongoose.model("CSVFILE", csvfileSchema);
module.exports = CSVFILE;
