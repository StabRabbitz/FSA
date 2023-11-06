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

console.log(process.env.JWT_SECRET);