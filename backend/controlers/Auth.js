const mongoose = require("mongoose");
path = require("path");

const { userSchema } = require("../modules/User");

const User = mongoose.model("User", userSchema);

const mailSender = require("../adapters/sendMail");
const tokenAdapter = require("../adapters/token");
const incriptAdapter = require("../adapters/incript");
const environmentVariable = require("../adapters/environmentVariables");

exports.userRegistration = async (req, res) => {
  try {
    const { userEmail, userName, password } = req.body;

    const hashPassword = await incriptAdapter.passwordIncript(password);

    const user = new User({
      userName: userName,
      userEmail: userEmail,
      password: hashPassword,
    });

    const result = await user.save();

    const token = tokenAdapter.genarateToken(result._id, result.userEmail);
    if (token)
      return res.status(200).json({
        isLoged: true,
        token: token,
        error: null,
      });

    res.status(500).json({
      isLoged: false,
      token: "Create account but can't login",
      error: "Internal server error",
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.userLogin = async (req, res) => {
  try {
    const { userEmail, password } = req.body;

    const result = await User.findOne({ userEmail: userEmail });

    if (!result) {
      res.status(401).json({
        isLoged: false,
        token: null,
        error: "No account found. Create account using this email",
      });
      return;
    }

    const isEqual = await incriptAdapter.passwordDecript(
      password,
      result.password
    );

    if (isEqual) {
      const token = tokenAdapter.genarateToken(result._id, result.userEmail);

      if (token)
        return res.status(200).json({
          isLoged: true,
          token: token,
          error: null,
        });
      res.status(500).json({
        isLoged: false,
        token: null,
        error: "Internal server error",
      });
    }

    res.status(401).json({
      isLoged: false,
      token: null,
      error: "Invalid password",
    });
  } catch (err) {
    res.status(500).json({
      isLoged: false,
      token: null,
      error: "Internal server error",
    });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { userEmail } = req.body;

    const email = environmentVariable.email;
    const password = environmentVariable.password;

    const result = await User.findOne({ userEmail: userEmail });

    if (!result) {
      res.status(401).json({
        isSend: false,
        error: "No account found. Create account using this email",
      });
      return;
    }

    mailSender
      .sendMail(
        email,
        password,
        userEmail,
        "Change you'r password",
        "use this link to change password - http://" +
          req.headers.host +
          "/api/auth/newPassword/" +
          result._id
      )
      .then(() => {
        return res.status(200).json({
          isSend: true,
          error: null,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          isSend: false,
          error: "Internal server error",
        });
      });
  } catch (err) {
    res.status(500).json({
      isSend: false,
      error: "Internal server error",
    });
  }
};

exports.newPassword = async (req, res) => {
  try {
    if (!req.params.id)
      return res.status(500).send("Something wrong !. Try again");

    res.render("index", { route: "/api/auth/restPassword/" + req.params.id });
  } catch (err) {
    res.status(500).send("Internal server error");
  }
};

exports.restPassword = async (req, res) => {
  try {
    if (!req.params.id)
      return res.status(500).send("Something wrong !. Try again");

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    User.findByIdAndUpdate(
      { _id: req.params.id },
      { password: hashedPassword },
      function (err, result) {
        if (err) {
          res.status(404).send("Not Found!");
        } else {
          res.status(200).send("changed password. Use new password to login");
        }
      }
    );
  } catch (err) {
    res.status(500).send("Internal server error");
  }
};
