
const estimateController = {

    // takes no auth req inputs and produces estimate output 
    estimate(req, res, next) {
        // do we want to produce an estimate if less than 3 years are provided? 
        const { year1, year2, year3 } = req.body;
        
        const sum = year1 + year2 + year3;
        const userAvg = sum / 3;

        const yearlyAverage = 1427;

        const trueDifference = userAvg - yearlyAverage;
        const roundedDifference = trueDifference.toFixed(2);
        let message = '';

        if (trueDifference > 0) {
            message = `You may be overpaying by $${roundedDifference}! Log in or sign up to be sure.`
        } else if (trueDifference < 0) {
            message = `You may be underpaying by $${Math.abs(roundedDifference)}! Log in or sign up to be sure.`
        } else if (trueDifference === 0) {
            message = `It looks like you're paying the right amount! Log in or sign up to be sure.`
        }

        res.locals.estimate = message;
        res.locals.difference = roundedDifference;
    
        return next()
    }
}

module.exports = estimateController;