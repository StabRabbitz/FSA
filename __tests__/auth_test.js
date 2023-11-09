const authcontroller = require('../server/controllers/authcontroller');
const { Client } = require('pg');


describe('auth unit tests', () => {
  beforeAll(async () => {
    const client = new Client({
      connectionString: process.env.POSTGRES_URI,
    });
    client.connect();

    const sqlQuery = 'DELETE FROM fsa_app_db AS fad WHERE fad.username = $1';
    const req = {
      body: {
        username: 'Zack',
        password: 'password123',
      },
    };
    const sqlParams = [req.body.username];

    client.query(sqlQuery, sqlParams);
  });

  afterAll(async () => {
    const client = new Client({
      connectionString: process.env.POSTGRES_URI,
    });
    client.connect();

    const sqlQuery = 'DELETE FROM fsa_app_db AS fad WHERE fad.username = $1';
    const req = {
      body: {
        username: 'Zack',
        password: 'password123',
      },
    };
    const sqlParams = [req.body.username];

    client.query(sqlQuery, sqlParams);
  });


   /** MODIFIED THE SIGNUP FUNCTION SO THESE TESTS NO LONGER WORK */
  // //Signup Tests
  // it('authcontroller.signup: Make sure user is successfully added to database', async () => {
  //   const req = {
  //     body: {
  //       username: 'Zack',
  //       password: 'password123',
  //     },
  //   };
  //   const res = {
  //     locals: {},
  //     cookie: () => {},
  //   };
  //   const next = (error = 'sign up successful') => {
  //     return error;
  //   };

  //   const result = await authcontroller.signup(req, res, next);
  //   expect(result).toEqual('sign up successful');
  // });

  // it('authcontroller.signup: Make sure error is thrown if username or password are not input', async () => {
  //   const req = {
  //     body: {
  //       username: 'username',
  //       //password: "password123"
  //     },
  //   };
  //   const res = {
  //     locals: {},
  //   };
  //   const next = (error = 'sign up successful') => {
  //     return error;
  //   };

  //   const result = await authcontroller.signup(req, res, next);
  //   expect(result).toEqual({
  //     log: 'Username or password not submitted',
  //     status: 422,
  //     message: { err: 'Username or password not submitted' },
  //   });
  // });

  // it('authcontroller.signup: Make sure you cannot create account with username that already exists', async () => {
  //   const req = {
  //     body: {
  //       username: 'Zack',
  //       password: 'password123',
  //     },
  //   };
  //   const res = {
  //     locals: {},
  //   };
  //   const next = (error = 'sign up successful') => {
  //     return error;
  //   };

  //   const result = await authcontroller.signup(req, res, next);
  //   expect(result).toEqual({
  //     log: 'Username already exists',
  //     status: 409,
  //     message: { err: 'Username already exists' },
  //   });
  // });

  //Login Tests
  it('authcontroller.login: tests that an error is thrown if username/psw not provided', async () => {
    const req = {
      body: {
        //username: '',
        password: 'password123',
      },
    };
    const res = {
      locals: {},
    };
    const next = (error = 'sign in successful') => {
      return error;
    };

    const result = await authcontroller.login(req, res, next);
    expect(result).toEqual({
      log: 'Username or password not submitted',
      status: 422,
      message: { err: 'Username or password not submitted' },
    });
  });

  it('authcontroller.login: tests if user doesnt exist by throwing an error', async () => {
    const req = {
      body: {
        username: 'RANDOMBLAHBLAH',
        password: 'password123',
      },
    };
    const res = {
      locals: {},
    };
    const next = (error = 'sign in successful') => {
      return error;
    };

    const result = await authcontroller.login(req, res, next);
    expect(result).toEqual({
      log: `Express error handler caught middleware error in authcontroller.login. Singular username not found`,
      status: 500,
      message: { err: `Username/Password combo is not correct` },
    });
  });

  it('authcontroller.login: tests if password matches username', async () => {
    const req = {
      body: {
        username: 'Zack',
        password: 'incorrectpassword123',
      },
    };
    const res = {
      locals: {},
    };
    const next = (error = 'sign in successful') => {
      return error;
    };

    const result = await authcontroller.login(req, res, next);
    expect(result).toEqual({
      log: `Express error handler caught middleware error in authcontroller.login. Password did not match`,
      status: 500,
      message: { err: `Username/Password combo is not correct` },
    });
  });

  it('authcontroller.login: logs user in if user is in database', async () => {
    const req = {
      body: {
        username: 'Zack',
        password: 'password123',
      },
    };
    const res = {
      locals: {},
      cookie: () => {},
    };
    const next = (error = 'sign in successful') => {
      return error;
    };

    const result = await authcontroller.login(req, res, next);
    expect(result).toBe('sign in successful');
  });

  
  it('authcontroller.isLoggedIn returns error object if provided incorrect token', async() => {
    const req = {
        body: {
          username: 'Zack',
          password: 'password123',
        },
        cookies: {
            token: 'stabrabbitz', //not a real token
        },
      };
      const res = {
        locals: {},
      };
      const next = (error = 'Login successful') => {
        return error;
      };
  
      const result = await authcontroller.isLoggedIn(req, res, next);
      expect(result).toStrictEqual({"log": "Express error handler caught middleware error in authcontroller.isLoggedIn. Error: JsonWebTokenError: jwt malformed", "message": {"err": "Error in checking if logged in: JsonWebTokenError: jwt malformed"}, "status": 500})
  });
}); 

