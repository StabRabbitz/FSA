const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// importing postgres uri and creating pool as temporary solution. Later will need to import the file where this pool is created
const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.POSTGRES_URI
})
// async function test() {
//     const result = await pool.query('select * from test_table')
//     console.log(result.rows);    
// }

// test();

const SALT_WORK_FACTOR = 10;

const authcontroller = {}

function createToken(id) {
    // jwt sign takes in:
    // payload - obj: use primary key value
    // secret key: string stored in .env
    // options - includes:
      // algorithm (defaults to HS256)
      // expiresIn (seconds?)
    // callback
    return jwt.sign({ id }, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRATION});
  }
  

function hashPassword(password) {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, SALT_WORK_FACTOR, (err, hash) => {
        if (err) {
          reject({
            log: `Error hashing password`,
            status: 500,
            message: { err: `Error in signup`},
          });
        } else {
          resolve(hash);
        }
      });
    });
  }

// sign up controller
authcontroller.hashNewPassword = async (req, res, next) => {
    console.log('signup controller invoked');
    try {
        // get username and password from req. If don't exist, invoke global error handler
        const {username, password} = req.body;
        if (!username || !password) return next({
            log: 'Username or password not submitted', 
            status: 422,
            message: { err: 'Username or password not submitted' },
        })
        
        
        // create new user with hashed password
        const hashedPassword = await hashPassword(password);
        res.locals.hashedPassword = hashedPassword;
        console.log(hashedPassword);

        return next();
    }
    catch (error) {
        // Invoke global err handler
        return next({
            log: `Express error handler caught middleware error in authcontroller.signup. Error: ${error}`,
            status: 500,
            message: { err: `Error in signup: ${error}`},
        })
    }
};

authcontroller.login = async (req, res, next) => {
    console.log('login controller invoked');
    try {
        // get username and password from req.body
        const { username, password } = req.body;
        if (!username || !password) return next({
            log: 'Username or password not submitted', 
            status: 422,
            message: { err: 'Username or password not submitted' },
        })

        // find username in DB
        const queryToFindUser = `
            select
                 fad.id
                ,fad.hashpassword
            from fsa_app_db fad
            where fad.username = $1
        `
        const values = [username]
        const userDetails = await pool.query(queryToFindUser, values)
        // invoke global error handler if user doesn't exist
        if (userDetails.rowCount !== 1) {
            // invoke bcrypt compare on something random to ensure the failure time is the same. Not sure what is best practice here
            const result = await bcrypt.compare('something', 'randomString');
            // then throw error
            return next({
                log: `Express error handler caught middleware error in authcontroller.login. Singular username not found`,
                status: 500,
                message: { err: `Username/Password combo is not correct`},
            })
        }

        // decrypt and throw error if returns false, meaning there is no match
        console.log('DB password: ', userDetails.rows[0].hashpassword);
        console.log('Req password', password);
        const result = await bcrypt.compare(password, userDetails.rows[0].hashpassword);
        console.log(result);
        if (!result) return next({
            log: `Express error handler caught middleware error in authcontroller.login. Password did not match`,
            status: 500,
            message: { err: `Username/Password combo is not correct`},
        });

        // get id of user
        const userId = userDetails.rows[0].id

        // create jwt and attache as a cookie
        const token = createToken(userId); // pass in primary key id
        res.cookie('token', token, {
            httpOnly: true,
            secure: true
            // ***** might need updates so it doesn't expire after session
        })
        
        const insertTokenParams = [token, username];
        const sqlQuery = `
            UPDATE fsa_app_db SET sessiontoken = $1 WHERE username = $2 RETURNING *
        `
        const tokenDetails = await pool.query(sqlQuery, insertTokenParams);
        console.log('tokenDetails.rows: ', tokenDetails.rows);
        if (tokenDetails.rowCount === 0) return next({
            log: `Failed to update session token in db`,
            status: 500,
            message: { err: `Error in login`},
        })

        // UPDATE table_name
        // SET column1 = value1, column2 = value2, ...
        // WHERE condition;

        // add username to res.locals and invoke next
        res.locals.user = username;


        return next();
    } catch (error) {
        // Invoke global err handler
        return next({
            log: `Express error handler caught middleware error in authcontroller.login. Error: ${error}`,
            status: 500,
            message: { err: `Username/Password combo is not correct`},
        })
}
};



authcontroller.isLoggedIn = (req, res, next) => {
    console.log('isLoggedin controller invoked');
    try {
        // get from cookies and check with jwt's built in verify method
        const { token } = req.cookies;
        console.log(token);
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        // throws an error if can't verify
        return next();
      } catch (error) {
        // Invoke global err handler
        return next({
            log: `Express error handler caught middleware error in authcontroller.isLoggedIn. Error: ${error}`,
            status: 500,
            message: { err: `Error in checking if logged in: ${error}`},
        })
      }
    
};



module.exports = authcontroller;