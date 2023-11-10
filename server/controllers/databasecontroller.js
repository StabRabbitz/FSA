const client = require('./model.js');
const jwt = require('jsonwebtoken');

// helper function to create a jwt
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

const databasecontroller = {
  // async getuser(req, res, next) {
  //   console.log('getuser controller');
  //   try {
  //     const userName = req.locals.user;
  //     console.log('name ', userName);

  //     if (!userName) {
  //       return next({
  //         status: 400,
  //         error: 'Name parameter is required.',
  //       });
  //     }

  //     const selectQuery = 'SELECT * FROM fsa_app_db WHERE username = $1';
  //     const selectParams = [userName];

  //     const result = await client.query(selectQuery, selectParams);
  //     console.log('result ', result);

  //     if (result.rows.length === 0) {
  //       return next({
  //         status: 404,
  //         error: 'User not found.',
  //       });
  //     }

  //     res.locals.user = result.rows[0];
  //     return next();
  //   } catch (error) {
  //     return next({
  //       status: 500,
  //       error: error.message,
  //     });
  //   }
  // },

  async makeuser(req, res, next) {
    try {
      const {
        username,
      } = req.body;

      const hashedPassword = res.locals.hashedPassword

      // manage error for incomplete user creation
      if (!username || !hashedPassword) {
        return next({
          status: 400,
          error: 'Name, password required.',
        });
      }

      // if user already exists, send message back
      const selectValues = [username];
      const selectQuery = `
          select 1
          from fsa_app_db fad
          where fad.username = $1
      `
      const userDetails = await client.query(selectQuery, selectValues);
      if (userDetails.rowCount > 0) return next({
          log: 'Username already exists',
          status: 409,
          message: { err: 'Username already exists' },
      })


      // handle errors on insert
      


      // create new user
      // const insertQuery = `INSERT INTO fsa_app_db (sessionToken, username, hashPassword, name, salary, taxPercent, employerCont, medCost1, medCost2, medCost3) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`;
      const insertQuery = `INSERT INTO fsa_app_db (username, hashPassword) VALUES ($1, $2) RETURNING *`;
      const insertParams = [
        username,
        hashedPassword,
      ]
      // sessionToken,
      // username,
      // hashedPassword,
      // name,
      // salary,
      // taxPercent,
      // employerCont,
      // medCost1,
      // medCost2,
      // medCost3,
      const newUser = await client.query(insertQuery, insertParams);

      if (newUser.rowCount === 0) return next({
        log: `Failed to insert user into db`,
        status: 500,
        message: { err: `Error in signup`},
      })
      // get id of newly inserted row
      const userId = newUser.rows[0].id

      // create jwt and attache as a cookie
      const token = createToken(userId); // pass in primary key id
      res.cookie('token', token, {
          httpOnly: true,
          secure: true
          // ***** might need updates so it doesn't expire after session
      })

      const insertTokenParams = [token, username];
      const sqlQuery = `
          INSERT INTO fsa_app_db (sessiontoken) VALUES ($1) WHERE username = $2 RETURNING *
      `
      const tokenDetails = await client.query(sqlQuery, insertTokenParams);
      if (tokenDetails.rowCount === 0) return next({
        log: `Failed to insert session token into db`,
        status: 500,
        message: { err: `Error in signup`},
      })

      res.locals.message = 'User creation succesful.';
      return next();
    } catch (error) {
      return next({
        status: 500,
        error: error,
      });
    }
  },

  async updateUser(req, res, next) {
    try {
      const {
        sessionToken,
        username,
        hashPassword,
        name,
        salary,
        taxPercent,
        employerCont,
        medCost1,
        medCost2,
        medCost3,
      } = req.body;

      // can likely eliminate this interior get request once we have a locals chain after auth implementation
      const selectQuery = 'SELECT * FROM fsa_app_db WHERE username = $1';
      const selectParams = [username];

      const userResults = await client.query(selectQuery, selectParams);

      if (userResults.rows.length === 0) {
        return next({
          status: 404,
          error: 'User not found.',
        });
      }

      const currentUser = userResults.rows[0];
      console.log('currentUser ', currentUser);
      const currentUserID = currentUser.id;
      console.log('currentUserID ', currentUserID);

      const updatedSessionToken = sessionToken || currentUser.sessionToken;
      const updatedUsername = username || currentUser.username;
      const updatedName = name || currentUser.name;
      const updatedSalary = salary || currentUser.salary;
      const updatedTaxPercent = taxPercent || currentUser.taxPercent;
      const updatedEmployerCont = employerCont || currentUser.employerCont;
      const updatedMedCost1 = medCost1 || currentUser.medCost1;
      const updatedMedCost2 = medCost2 || currentUser.medCost2;
      const updatedMedCost3 = medCost3 || currentUser.medCost3;

      const updateQuery = `
                UPDATE fsa_app_db
                SET username = $1, name = $2, salary = $3, taxPercent = $4, employerCont = $5, medCost1 = $6, medCost2 = $7, medCost3 = $8, sessionToken = $9
                WHERE id = $9
            `;

      const calculations = {};

      calculations.avgMedicalExpenses =
        (updatedMedCost1 + updatedMedCost2 + updatedMedCost3) / 3;
      calculations.avgMedicalExpenses =
        calculations.avgMedicalExpenses.toFixed(2);
      calculations.yearlyCont =
        calculations.avgMedicalExpenses - updatedEmployerCont;
      calculations.monthlyCont = calculations.yearlyCont / 12;
      calculations.salaryAfterCont =
        updatedSalary - calculations.avgMedicalExpenses;

      const updateParams = [
        updatedSessionToken,
        updatedUsername,
        updatedName,
        updatedSalary,
        updatedTaxPercent,
        updatedEmployerCont,
        updatedMedCost1,
        updatedMedCost2,
        updatedMedCost3,
        currentUserID,
      ];

      const result = await client.query(updateQuery, updateParams);

      res.locals.message = 'User updated successfully';
      res.locals.updatedUser = result;
      res.locals.calculations = calculations;

      return next();
    } catch (error) {
      return next({
        status: 500,
        error: error,
      });
    }
  },

  async deleteuser(req, res, next) {
    try {
      const username = res.locals.user;

      // can likely eliminate this interior get request once we have a locals chain after auth implementation
      const selectQuery = 'SELECT * FROM fsa_app_db WHERE username = $1';
      const selectParams = [username];

      const userResults = await client.query(selectQuery, selectParams);

      if (userResults.rows.length === 0) {
        return next({
          status: 404,
          error: 'User not found.',
        });
      }

      const currentUser = userResults.rows[0];
      console.log('currentUser ', currentUser);
      const currentUserID = currentUser.id;
      console.log('currentUserID ', currentUserID);

      const deleteQuery = 'DELETE FROM fsa_app_db WHERE id = $1';
      const deleteParams = [currentUserID];
      const deleteResult = await client.query(deleteQuery, deleteParams);

      res.locals.deletedUser = deleteResult;
      res.locals.message = 'User deleted';
      return next();
    } catch (error) {
      return next({
        status: 500,
        error: error.message,
      });
    }
  },
};

module.exports = databasecontroller;
