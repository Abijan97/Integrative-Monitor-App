const mongoose = require("mongoose");

const sensorSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true,
  },
  thresholdValue: {
    type: Number,
    required: true,
  },
  sensorId: {
    type: String,
    required: true,
  },
});

module.exports.sensorSchema = sensorSchema;
