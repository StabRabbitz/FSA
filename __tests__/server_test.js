require('../server/server.js');
const request = require('supertest');

const server = 'http://localhost:3000/api';


/** 
 * testing routes:
 *  ALL ROUTES START WITH '/api' *****
 *  1. get '/'                  DONE
 *  2. post '/estimate'
 *  3. post '/login'
 *  4. post '/signup'
 *  5. patch '/updateuser'
 *  6. get '/isloggedin'
 *  7. get '/updatequote' -- is not in use right now, has nothing written in it
 *  8. delete '/deleteuser'
 */ 


describe('Route integration', () => {

    describe('/', () => {
        describe('GET', () => {
        // Note that we return the evaluation of `request` here! It evaluates to
        // a promise, so Jest knows not to say this test passes until that
        // promise resolves. See https://jestjs.io/docs/en/asynchronous
        it('responds with 200 status and text/html content type', () => {
            return request(server)
            .get('/')
            .expect('Content-Type', /text\/html/)
            .expect(200);
          });
        });
    });
    
    describe('/estimate', () => {
        describe('POST', () => {
        it('responds with 200 status and application/json content type', () => {
            return request(server)
            .post('/estimate')
            .send({
                expense23: 1000,
                expense22: 1000,
                expense21: 1000,
              })
            .expect('Content-Type', /application\/json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toHaveProperty('moneyLost');
                expect(response.body).toHaveProperty('lostTaxSavings');
            })
          });
        });
    });

    describe('/signup', () => {
        describe('POST', () => {
        xit('creates new user', () => {
                return request(server)
                .post('/signup')
                .send({
                    username: 'Zack number 106',
                    password: 'test',
                    age: 25,
                    salary: 505000
                })
                .expect('Content-Type', /application\/json/)
                .expect(200)
                .then((response) => {
                    expect(response.body).toBe('User creation succesful.')
                })
            })
        });
    });
    
    describe('/login', () => {
        describe('POST', () => {
        it('logs user in', () => {
                return request(server)
                .post('/login')
                .send({
                    username: 'Zack number 106',
                    password: '$2b$10$kpsvNDyhD/PURNrN2DgaveYxqHTppa0HqyosCb3Wb0jNY3cZBKaW2'
                })
                .expect('Content-Type', /application\/json/)
                .expect(200)
                .then((response) => {
                    expect(response.body.username).toBe('Zack number 106')
                })
            })
        });
    });
});


    
// // log-in
// apiRouter.post('/login', authcontroller.login, databasecontroller.getuser, (req, res) => {
//     res.status(200).json(res.locals.user);
//   });




// /**
//  * Read the docs! https://www.npmjs.com/package/supertest
//  */
// describe('Route integration', () => {
//     describe('/', () => {
//       describe('GET', () => {
//         // Note that we return the evaluation of `request` here! It evaluates to
//         // a promise, so Jest knows not to say this test passes until that
//         // promise resolves. See https://jestjs.io/docs/en/asynchronous
//         it('responds with 200 status and text/html content type', () => {
//           return request(server)
//             .get('/')
//             .expect('Content-Type', /text\/html/)
//             .expect(200);
//         });
//       });
//     });
  
//     describe('/markets', () => {
//       describe('GET', () => {
//         it('responds with 200 status and application/json content type', () => {
//            return request(server)
//             .get('/markets')
//             .expect('Content-Type', /application\/json/)
//             .expect(200);
//         });
  
//         // For this test, you'll need to inspect the body of the response and
//         // ensure it contains the markets list. Check the markets.dev.json file
//         // in the dev database to get an idea of what shape you're expecting.
//         it('markets from "DB" json are in body of response', async() => {
//           // 2 options
//           /*  
//             1. We check the body of the response for any array data
//               - Unless we specify exactly what's in our db, we don't know if we'll get an empty array or a populated one
//             2. Before making our request, we fs.writeFileSync dummy market data to the json db. 
//               - Then we make our request and check that the response contains the data we placed in the db
//           */
//           const marketList = [{ location: 'here', cards: 11 }, { location: 'there', cards: 0 }];
//           fs.writeFileSync(testJsonFile, JSON.stringify(marketList));
//           // console.log(fs.readFileSync(testJsonFile));
//           const response = await request(server)
//             .get('/markets')
//             .set('Accept', /application\/json/);
//           // response = await response.json();
//           // expect(fs.readFileSync(testJsonFile)).toEqual('1');
//           // console.log(response.body);
//           expect(response.body).toEqual(marketList);
//         });
//       });
  
//       describe('PUT', () => {
//         it('responds with 200 status and application/json content type', () => {
//           const marketList = [{ location: 'here', cards: 11 }, { location: 'there', cards: 0 }];
//           return request(server)
//             .put('/markets')
//             .send(marketList)
//             .set('Accept', /application\/json/)
//             .expect('Content-Type', /application\/json/)
//             .expect(200);
//         });
  
//         it('responds with the updated market list', async () => {
//           const marketList = [{ location: 'here', cards: 11 }, { location: 'there', cards: 0 }];
//           const response = await request(server)
//             .put('/markets')
//             .send(marketList);
//           expect(response.body).toEqual(marketList);
//         });
  
//         it('responds to invalid request with 400 status and error message in body', async () => {
//           const marketList = [{ location: 12, cards: 11 }, { location: 'there', cards: 0 }];
//           const response = await request(server)
//             .put('/markets')
//             .send(marketList)
//           expect(response.body.error).toBeTruthy(); // {error: 'error 404 occured'}
//           expect(response.status).toEqual(400);
//         });
//       });
//     });
//   });
  