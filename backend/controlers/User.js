const mongoose = require("mongoose");

const { userSchema } = require("../modules/User");

const User = mongoose.model("User", userSchema);

exports.userUpdate = async (req, res) => {
  res.send("skjdfrhguikjdhgu");
};
