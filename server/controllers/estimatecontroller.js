
const estimateController = {

    // takes no auth req inputs and produces estimate output 
    estimate(req, res, next) {
        // do we want to produce an estimate if less than 3 years are provided? 
        const { expense21, expense22, expense23 } = req.body;

        console.log(expense21, expense22, expense23 )

        let length = 3;

        if (typeof expense21 !== 'number') {
            expense21 = 0;
            length--;
        }
        if (typeof expense22 !== 'number') {
            expense22 = 0;
            length--;
        }
        if (typeof expense23 !== 'number') {
            expense23 = 0;
            length--;
        }
        
        const sum = expense21 + expense22 + expense23;
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

        res.locals.moneyLost = moneyLost;
        res.locals.lostTaxSavings = lostTaxSavings;
    
        return next()
    }
}

module.exports = estimateController;