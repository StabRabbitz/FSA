
const estimateController = {

    // takes no auth req inputs and produces estimate output 
    estimate(req, res, next) {
        // do we want to produce an estimate if less than 3 years are provided? 
        const { expense23, expense22, expense21 } = req.body;

        console.log(expense21, expense22, expense23);

        let parsedExpense23 = parseFloat(expense23);
        let parsedExpense22 = parseFloat(expense22);
        let parsedExpense21 = parseFloat(expense21);

        let length = 3;

        if (isNaN(parsedExpense21)) {
            console.log("111111111111111111")
            parsedExpense21 = 0;
            length--;
        }
        if (isNaN(parsedExpense22)) {
            console.log("222222222222222222")
            parsedExpense22 = 0;
            length--;
        }
        if (isNaN(parsedExpense23)) {
            console.log("33333333333333333")
            parsedExpense23 = 0;
            length--;
        }
        
        const sum = parsedExpense21 + parsedExpense22 + parsedExpense23;
        let userAvg = sum / length;
        userAvg = userAvg.toFixed(2);
        console.log('userAvg ', userAvg);

        const maxCont = 3050;
        let moneyLost = maxCont - userAvg;
        moneyLost = moneyLost.toFixed(2);
        console.log('moneyLost ', moneyLost);

        const avgTax = .25; 
        let lostTaxSavings = userAvg * avgTax;
        lostTaxSavings = lostTaxSavings.toFixed(2);

        res.locals.userAvg = userAvg;
        res.locals.moneyLost = moneyLost;
        res.locals.lostTaxSavings = lostTaxSavings;
    
        return next()
    }
}

module.exports = estimateController;