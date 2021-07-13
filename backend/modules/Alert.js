const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema({
  sensorId: {
    type: String,
    required: true,
  },
  timestamp: {
    type: String,
    required: true,
  },
  temperature: {
    type: String,
    required: true,
  },
});

module.exports.alertSchema = alertSchema;
