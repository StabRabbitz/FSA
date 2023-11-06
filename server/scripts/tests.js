const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// function to create jwt
function createToken(id) {
  // jwt sign takes in:
    // payload - obj: use primary key value
    // secret key: string stored in .env
    // options - includes:
      // algorithm (defaults to HS256)
      // expiresIn (seconds?)
    // callback
  return jwt.sign({ id }, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRATION});
}

/*
 https://stackoverflow.com/questions/31309759/what-is-secret-key-for-jwt-based-authentication-and-how-to-generate-it

 JWT is a string with three distinct parts: header, payload, signature
 - header: json string that specifies type as jwt and the algorithm you're using
 - payload: data you want to keep in the string

*/

async function verifyToken() {
  try {
    // get from cookies
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // The token is valid. You can use the payload here.
  } catch (error) {
    // The token is not valid. Handle the error here.
  }
}

const SALT_WORK_FACTOR = 10;
function hashPassword(password) {
  bcrypt.hash(password, SALT_WORK_FACTOR, (err, hash) => {
      if (err) return next({
          log: `Error hashing password`,
          status: 500,
          message: { err: `Error in signup`},
      });
      return hash;        
  })
}

console.log(hashPassword('hey'));