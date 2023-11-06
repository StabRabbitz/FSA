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

const authcontroller = {}

// helper function to create a jwt
function createToken(userObj) {
    // jwt sign method takes in user
    return jwt.sign(userObj);
}

// sign up controller
authcontroller.signup = async (req, res, next) => {
    console.log('signup controller invoked');
    try {
        // get username and password from req. If don't exist, invoke global error handler
        const {username, password} = req.body;
        if (!username || !password) next({
            log: 'Username or password not submitted', 
            status: 422,
            message: { err: 'Username or password not submitted' },
        })
        
        // if user already exists, send message back
        const selectValues = [username];
        const selectQuery = `
            select 1
            from fsa_app_db fad
            where fad.username = $1
        `
        const userDetails = await pool.query(selectQuery, selectValues);
        if (userDetails.rowCount > 0) next({
            log: 'Username already exists',
            status: 409,
            message: { err: 'Username already exists' },
        })
        // create new user with hashed password
        // *** password isn't hashed right now
        const insertQuery = `
            insert into fsa_app_db (
                username
                , hashpassword
            )
            values (
                $1
                ,$2
            )
        `
        const insertValues = [username, password]
        const newUser = await pool.query(insertQuery, insertValues);
        // handle errors on insert
        if (newUser.rowCount === 0) next({
            log: `Failed to insert user into db`,
            status: 500,
            message: { err: `Error in signup`},
        })

        // **** attach jwt to cookies
        // const token = createToken(); // what do I pass in here
        // res.cookie('token', token, {
        //     httpOnly: true,
        //     secure: true
        // })

        // add username to res.locals and invoke next
        res.locals.username = username;
        next();
    }
    catch (error) {
        // Invoke global err handler
        next({
            log: `Express error handler caught middleware error in authcontroller.signup. Error: ${error}`,
            status: 500,
            message: { err: `Error in signup: ${error}`},
        })
    }
    next();
};

authcontroller.login = async (req, res, next) => {
    console.log('login controller invoked');
    next();
};



authcontroller.isLoggedIn = async (req, res, next) => {
    console.log('isLoggedin controller invoked');
    next();
};



module.exports = authcontroller;