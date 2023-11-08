const estimatecontroller = require('../server/controllers/estimatecontroller');


//tests:
describe('estimate controller tests', () => {
    it('make sure user average is calculated correctly', async () => {
        const req = {
            body: {
                expense23: 1200,
                expense22: 1000,
                expense21: 1500
            }
        }
        const res = {
            locals: {}
        }
        const next = () => {
            return res.locals.userAvg;
        }
        
        const userAvg = ((req.body.expense21 + req.body.expense22 + req.body.expense23) / 3).toFixed(2); //1233.33
        const calculatedUserAvg = await estimatecontroller.estimate(req, res, next);
        expect(calculatedUserAvg).toEqual(userAvg);
    });
    
    it('make sure moneylost is calculated correctly', async() => {
        const req = {
            body: {
                expense23: 1200,
                expense22: 1000,
                expense21: 1500
            }
        }
        const res = {
            locals: {}
        }
        const next = () => {
            return res.locals.moneyLost;
        }
        const userAvg = ((req.body.expense21 + req.body.expense22 + req.body.expense23) / 3).toFixed(2);
        const maxCont = 3050;
        const moneyLost = (maxCont - userAvg).toFixed(2);
        const calculatedMoneyLost = await estimatecontroller.estimate(req, res, next);
        expect(calculatedMoneyLost).toEqual(moneyLost);
    })

    xit('make sure losttaxsavings is calculated correctly', () => {
        const req = {
            body: {
                expense23: 1200,
                expense22: 1000,
                expense21: 1500
            }
        }
        
    })
    
    xit('make sure it calculates based off only one input', () => {
        const req = {
            body: {
                expense23: 0,
                expense22: 0,
                expense21: 1000
            }
        }
    })
    
    xit('make sure it calculates based off only two input', () => {
        const req = {
            body: {
                expense23: 0,
                expense22: 1000,
                expense21: 1000
            }
        }
    })
});



//test useraverage is calculated correctly
//test moneylost is calculated correctly
//test losttaxsavings is calculated correctly

//test that it calculates based off only one input
//test that it calculates based off only two input



// estimate(req, res, next) {
//     // do we want to produce an estimate if less than 3 years are provided? 
//     const { expense23, expense22, expense21 } = req.body;

//     console.log(expense21, expense22, expense23);

//     let parsedExpense23 = parseFloat(expense23);
//     let parsedExpense22 = parseFloat(expense22);
//     let parsedExpense21 = parseFloat(expense21);

//     let length = 3;

//     if (isNaN(parsedExpense21)) {
//         console.log("111111111111111111")
//         parsedExpense21 = 0;
//         length--;
//     }
//     if (isNaN(parsedExpense22)) {
//         console.log("222222222222222222")
//         parsedExpense22 = 0;
//         length--;
//     }
//     if (isNaN(parsedExpense23)) {
//         console.log("33333333333333333")
//         parsedExpense23 = 0;
//         length--;
//     }
    
//     const sum = parsedExpense21 + parsedExpense22 + parsedExpense23;
//     let userAvg = sum / length;
//     userAvg = userAvg.toFixed(2);
//     console.log('userAvg ', userAvg);

//     const maxCont = 3050;
//     let moneyLost = maxCont - userAvg;
//     moneyLost = moneyLost.toFixed(2);
//     console.log('moneyLost ', moneyLost);

//     const avgTax = .25; 
//     let lostTaxSavings = userAvg * avgTax;
//     lostTaxSavings = lostTaxSavings.toFixed(2);

//     res.locals.userAvg = userAvg;
//     res.locals.moneyLost = moneyLost;
//     res.locals.lostTaxSavings = lostTaxSavings;

//     return next()
// }
// }