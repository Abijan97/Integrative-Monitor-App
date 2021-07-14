const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");

const UserControler = require("../controlers/User");
const AuthUser = require("../middleware/Auth");
const { userSchema } = require("../modules/User");

const User = mongoose.model("User", userSchema);

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/profileImages");
  },
  filename: (req, file, cb) => {
    const { originalname, mimetype } = file;
    cb(null, originalname);
  },
});

var upload = multer({ storage });

router.put("/updateUser", AuthUser, UserControler.userUpdate);

router.get("/user", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../uploads/profileImages/aaitf-china.jpg")
  );
});

module.exports = router;
