const mongoose = require("mongoose");

const { recordSchema } = require("../modules/Record");
const { alertSchema } = require("../modules/Alert");

const Record = mongoose.model("Record", recordSchema);
const Alert = mongoose.model("Alert", alertSchema);

const mailAdapter = require("../adapters/sendMail");

const environmentVariable = require("../adapters/environmentVariables");

exports.addRecord = async (req, res) => {
  try {
    const { temperature, sensorId } = req.body;
    const timestamp = new Date().toISOString();

    if (req.body.thresholdValue <= temperature) {
      const alert = new Alert({
        temperature,
        timestamp,
        sensorId,
      });

      await alert.save();

      const email = environmentVariable.email;
      const password = environmentVariable.password;

      await mailAdapter.sendMail(
        email,
        password,
        req.body.userEmail,
        "Alert!!!",
        "your sensor has more tempeture more than treshhold value"
      );
    }

    const record = new Record({
      temperature,
      timestamp,
      sensorId,
    });

    const result = await record.save();

    return res.status(200).json({
      isAdded: true,
      data: result,
      error: null,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

exports.getRecord = async (req, res) => {
  Record.find({ sensorId: req.body.sensorId })
    .then((record) => {
      if (record) {
        return res.status(200).json({
          data: record,
          error: null,
        });
      } else {
        return res.status(500).json({
          data: null,
          error: "No sensor found",
        });
      }
    })
    .catch((err) => {
      return res.status(500).json({
        data: null,
        error: "No sensor found",
      });
    });
};
