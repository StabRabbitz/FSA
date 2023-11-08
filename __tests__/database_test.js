//Database Testing

const dbcontroller = require('../server/controllers/databasecontroller');

//Strategy for testing middlewear:
//if middlewear works, it will return next with no arguments
//if middlewear doesn't work, it will return next with an err object passed in

describe('db unit tests', () => {
  describe('#CRUD', () => {
    //makeuser tests:
    it('#makeuser should create user in database', async () => {
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
          medCost3: 12,
        },
      };
      const res = {
        locals: {
          message: '',
        },
      };
      const next = (error = 'User creation successful') => {
        return error;
      };

      const result = await dbcontroller.makeuser(req, res, next);
      expect(result).toEqual('User creation successful');
    });

    it('#makeuser should return error object if req.body is missing information', async () => {
      const req = {
        body: {
          //   username: 'Zack',
          hashPassword: '123',
          age: 12,
          salary: 12,
          taxPercent: 12,
          employerCont: 12,
          medCost1: 12,
          medCost2: 12,
          medCost3: 12,
        },
      };
      const res = {
        locals: {
          message: '',
        },
      };
      const next = (error = 'User creation successful') => {
        return error;
      };

      const result = await dbcontroller.makeuser(req, res, next);
      expect(result).toEqual({
        status: 400,
        error: 'Name, age, and salary required.',
      });
    });

    //getuser tests:
    it('#getuser should retrieve existing user from database', async () => {
      const req = {
        locals: {
          user: 'Zack',
        },
      };
      const res = {
        locals: {
          user: '',
        },
      };
      const next = (error = 'User retrieval successful') => {
        return error;
      };

      const result = await dbcontroller.getuser(req, res, next);
      expect(result).toEqual('User retrieval successful');
    });

    it('#getuser should return error object if there is no username in the req object', async () => {
      const req = {
        locals: {},
      };
      const res = {
        locals: {
          user: '',
        },
      };
      const next = (error = 'User retrieval successful') => {
        return error;
      };

      const result = await dbcontroller.getuser(req, res, next);
      expect(result).toEqual({
        status: 400,
        error: 'Name parameter is required.',
      });
    });

    it('#getuser should return error object if username in req object does not match a username in the db', async () => {
      const req = {
        locals: {
          user: 'THISUSERDOESNOTEXISTLOLOL',
        },
      };
      const res = {
        locals: {
          user: '',
        },
      };
      const next = (error = 'User retrieval successful') => {
        return error;
      };

      const result = await dbcontroller.getuser(req, res, next);
      expect(result).toEqual({
        status: 404,
        error: 'User not found.',
      });
    });

    //updateuser tests
    it('#updateuser should update an existing user in the database', async () => {
      const req = {
        body: {
          username: 'Zack',
          hashPassword: '123',
          age: 13,
          salary: 13,
          taxPercent: 13,
          employerCont: 13,
          medCost1: 13,
          medCost2: 13,
          medCost3: 13,
        },
      };
      const res = {
        locals: {
          message: '',
          updatedUser: '',
          calculations: '',
        },
      };
      const next = (error = 'User update successful') => {
        return error;
      };

      const result = await dbcontroller.updateUser(req, res, next);
      expect(result).toEqual('User update successful');
    });

    it('#updateuser should return an error object if user does not exist in database', async () => {
      const req = {
        body: {
          username: 'THISUSERDOESNOTEXISTLOLOL',
          hashPassword: '123',
          age: 13,
          salary: 13,
          taxPercent: 13,
          employerCont: 13,
          medCost1: 13,
          medCost2: 13,
          medCost3: 13,
        },
      };
      const res = {
        locals: {
          message: '',
          updatedUser: '',
          calculations: '',
        },
      };
      const next = (error = 'User update successful') => {
        return error;
      };

      const result = await dbcontroller.updateUser(req, res, next);
      expect(result).toEqual({
        status: 404,
        error: 'User not found.',
      });
    });

    //deleteuser tests
    it('#deleteuser successfully deleted user', async () => {
      const req = {};
      const res = {
        locals: {
          user: 'Zack',
          deletedUser: '',
          message: '',
        },
      };
      const next = (error = 'User delete successful') => {
        return error;
      };

      const result = await dbcontroller.deleteuser(req, res, next);
      expect(result).toEqual('User delete successful');
    });

    it('#deleteuser returns an error object bc it cant find the user', async () => {
      const req = {};
      const res = {
        locals: {
          user: 'NOTAREALDUDE404',
          deletedUser: '',
          message: '',
        },
      };
      const next = (error = 'User delete successful') => {
        return error;
      };

      const result = await dbcontroller.deleteuser(req, res, next);
      expect(result).toEqual({
        status: 404,
        error: 'User not found.',
      });
    });
  });
});


