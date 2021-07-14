const express = require("express");
const { body} = require('express-validator');
const mongoose = require("mongoose");
var os = require("os");

const validator = require("../middleware/Validater");
const Auth = require("../controlers/Auth");
const AuthUser = require("../middleware/Auth")
const {userSchema} = require("../modules/User");

const User = mongoose.model("User", userSchema);

const router = express.Router();

router.post('/register',[
    body('userName').not().isEmpty(),
    body('password').isLength({ min: 6 }).not().isEmpty(),
    body('userEmail').isEmail().custom(value => {
        return User.findOne({ userEmail: value }).then(user => {
          if (user) {
            return Promise.reject('E-mail already in use');
          }
        })
      })
  ],validator, Auth.userRegistration);


 router.post('/login',[
    body('password').isLength({ min: 6 }).not().isEmpty(),
    body('userEmail').isEmail()
  ],validator,Auth.userLogin );


  router.post('/changePassword',[
    body('userEmail').isEmail().custom(value => {
      return User.findOne({ userEmail: value }).then(user => {
        if (!user) {
          return Promise.reject('No Account found. Create account using this email');
        }
      })
    })
  ],validator,Auth.changePassword );


  router.get('/newPassword/:id',Auth.newPassword );

  router.post('/restPassword/:id',
  [ body('password').isLength({ min: 6 }).not().isEmpty()],
  validator,Auth.restPassword );





  module.exports = router;