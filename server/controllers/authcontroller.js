const authcontroller = {}

authcontroller.login = async (req, res, next) => {
    console.log('login controller');
    next();
};

authcontroller.signup = async (req, res, next) => {
    console.log('signup controller');
    next();
};

authcontroller.isLoggedIn = async (req, res, next) => {
    console.log('isLoggedin controller');
    next();
};



module.exports = authcontroller;