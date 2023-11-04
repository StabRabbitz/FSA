
const databasecontroller = {

    getuser(req, res, next) {
        console.log('getuser controller');
        next();
    }

}

module.exports = databasecontroller;