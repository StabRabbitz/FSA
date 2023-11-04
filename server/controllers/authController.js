const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authCotroller = {};

// controller for sign-up
authCotroller.signup = async (req, res, next) => {
  try {
    // get user data from from req body
    const { username, password } = req.body;

    // hash the password with bcrypt

    // store in db and ensure there are no duplicate usernames
  }
  
  catch (err) {
    // invoke global err handler
  }
};

authCotroller.login = async (req, res, next) => {
  try {
    // get user data from req body
    const { username, password } = req.body;

    // compare password from req body with password saved in db using bcrypt compare function

    // if they match, create a json web token as a cookie and add to res

  }
  catch (err) {

  }
}

authController.verifyUse = (req, res, next) => {

}

exports.default = authCotroller;