
const authcontroller = {};

login(req, res, next) {
  console.log('login controller');
  next();
},

signup(req, res, next) {
  console.log('signup controller');
  next();
},

isLoggedIn(req, res, next) {
  console.log('isLoggedin controller');
  next();
},

module.exports = authcontroller;