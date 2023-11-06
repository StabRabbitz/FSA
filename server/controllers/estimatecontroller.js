
const estimateController = {

    estimate(req, res, next) {
        console.log('controller.estimate');
        next()
    }
}

module.exports = estimateController;