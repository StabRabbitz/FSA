//Database Testing

const dbcontroller = require("../server/controllers/databasecontroller");


describe('db unit tests', () => {
    

//How can we test getuser to ensure it is working
//ex dbcontroller.getuser() to access the getuser middlewear from the databasecontroller.js
    describe('#makeuser', () => {
        //first test
        //test to make sure username and password field are not empty
        //if database is not creating a new row
        //if new database row does not contain the correct username and password

      it('example', async () => {
        const req = {
            body: {
                username: 'Zack',
                hashPassword: '123',
                age: 12,
                salary: 12,
                taxPercent: 12,
                employerCont: 12,
                medCost1: 12,
                medCost2: 12,
                medCost3: 12
            }
        }
        const res = {
            locals: {
                message: '',
            }
        }

        const next = () => {
            return 'User creation succesful.';
        }
        const result = await dbcontroller.makeuser(req, res, next);
            expect(result).toEqual('User creation succesful.');

        // async makeuser(req, res, next) {
        //     try {
        //         const { username, hashPassword, age, salary, taxPercent, employerCont, medCost1, medCost2, medCost3 } = req.body;
                
        //         // manage error for incomplete user creation 
        //         if (!username || !age || !salary) {
        //             next({
        //                 status: 400,
        //                 error: 'Name, age, and salary required.'
        //             })
        //         }
    
        //         // create new user 
        //         const insertQuery = `INSERT INTO fsa_app_db (username, hashPassword, age, salary, taxPercent, employerCont, medCost1, medCost2, medCost3) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`;
        //         const insertParams = [username, hashPassword, age, salary, taxPercent, employerCont, medCost1, medCost2, medCost3];
    
        //         const result = await client.query(insertQuery, insertParams);
        //         res.locals.message = 'User creation succesful.'
        //         return next();
    
        //     } catch (error) {
        //         return next({
        //             status: 500,
        //             error: error, 
        //         })
        //     }
        // },





      });


      xit('example', () => {


      });


      xit('example', () => {


      });



    })


});


//example:
// beforeAll(async () => {
       
//     connection = await mongoose.connect('mongodb://localhost:27017/test_'+process.env.DATABASE,{useNewUrlParser: true, useUnifiedTopology: true });
//     db = mongoose.connection;
//     const collection = process.env.COLLECTION;
//     await db.createCollection(collection);
//  });

//  afterAll(async () => {
//     const collection = "test_"+process.env.COLLECTION;
//     await db.dropCollection(collection);
//     await db.dropDatabase();
//     await db.close();
//     await connection.close();
//  });

//  //example creating 
//  test("Add Customer POST /customers",async () => {
//     const response = await customers.create({
//           name: process.env.CUSTOMER_NAME,
//           email: process.env.CUSTOMER_EMAIL});
//           await response.save();
//           expect(response.name).toBe(process.env.CUSTOMER_NAME);
//     });