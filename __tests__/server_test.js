const db = require('../server/server.js');
const request = require('supertest');

const server = 'http://localhost:3000/api';


/** 
 * testing routes:
 *  ALL ROUTES START WITH '/api' *****
 *  1. get '/'
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




    

})




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
  