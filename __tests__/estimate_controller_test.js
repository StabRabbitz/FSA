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

    it('make sure losttaxsavings is calculated correctly', async() => {
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
            return res.locals.lostTaxSavings;
        }
        const userAvg = ((req.body.expense21 + req.body.expense22 + req.body.expense23) / 3).toFixed(2);
        const avgTax = .25; 
        const lostTaxSavings = (userAvg * avgTax).toFixed(2);
        const calculatedLostTaxSavings = await estimatecontroller.estimate(req, res, next);
        expect(calculatedLostTaxSavings).toEqual(lostTaxSavings);
        
    })
    
    it('make sure it calculates based off less than three inputs', async () => {
        const req = {
            body: {
                expense23: NaN,
                expense22: 1500,
                expense21: 1000
            }
        }
        const res = {
            locals: {}
        }
        const next = () => {
            return res.locals.userAvg;
        }
        
        const userAvg = ((req.body.expense21 + req.body.expense22) / 2).toFixed(2); //1250.00
        const calculatedUserAvg = await estimatecontroller.estimate(req, res, next);
        expect(calculatedUserAvg).toEqual(userAvg);
    })
});


