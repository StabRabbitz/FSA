const client = require('./model.js');
const databasecontroller = {

    async getuser(req, res, next) {
        console.log('getuser controller')
        try {

        const { name } = req.body;
        console.log('name ', name)

        if (!name) {
            return next({
                status: 400,
                error: 'Name parameter is required.'
            });
        }

        const selectQuery = 'SELECT * FROM test_table WHERE name = $1';
        const selectParams = [name];

        const result = await client.query(selectQuery, selectParams);
        console.log('result ', result)

        if (result.rows.length === 0) {
            return next({
                status: 404,
                error: 'User not found.'
            });
        }

        res.locals.user = result.rows[0];
        next();

    } catch (error) {
        return next({
            status: 500,
            error: error.message
        });
    }

    },

    async makeuser(req, res, next) {
        try {
            const { name, age, salary } = req.body;
            
            // manage error for incomplete user creation 
            if (!name || !age || !salary) {
                next({
                    status: 400,
                    error: 'Name, age, and salary required.'
                })
            }

            // create new user 
            const insertQuery = `INSERT INTO test_table (name, age, salary) VALUES ($1, $2, $3)`;
            const insertParams = [name, age, salary];

            const result = await client.query(insertQuery, insertParams);
            res.locals.message = 'User creation succesful.'
            return next();

        } catch (error) {
            return next({
                status: 500,
                error: error, 
            })
        }
    },

    async updateUser (req, res, next) {
        try{
            const { name, age, salary } = req.body; 

            // can likely eliminate this interior get request once we have a locals chain after auth implementation
            const selectQuery = 'SELECT * FROM test_table WHERE name = $1';
            const selectParams = [name];

            const userResults = await client.query(selectQuery, selectParams);

            if (userResults.rows.length === 0) {
                return next({
                    status: 404,
                    error: 'User not found.'
                });
            }

            const currentUser = userResults.rows[0];
            console.log('currentUser ', currentUser)
            const currentUserID = currentUser.id;
            console.log('currentUserID ', currentUserID)

            const updatedName = name || currentUser.name;
            const updatedAge = age || currentUser.age;
            const updatedSalary = salary || currentUser.salary;

            const updateQuery = `
                UPDATE test_table
                SET name = $1, age = $2, salary = $3
                WHERE id = $4
            `;

            const updateParams = [updatedName, updatedAge, updatedSalary, currentUserID];

            const result = await client.query(updateQuery, updateParams);

            res.locals.message = 'User updated successfully';
            return next();

        } catch (error) {
            return next({
                status: 500,
                error: error, 
            })
        }
    }, 

    async deleteuser(req, res, next) {
        try {

        const { name, age, salary } = req.body; 

            // can likely eliminate this interior get request once we have a locals chain after auth implementation
        const selectQuery = 'SELECT * FROM test_table WHERE name = $1';
        const selectParams = [name];

        const userResults = await client.query(selectQuery, selectParams);

        if (userResults.rows.length === 0) {
            return next({
                status: 404,
                error: 'User not found.'
            });
        }

        const currentUser = userResults.rows[0];
        console.log('currentUser ', currentUser)
        const currentUserID = currentUser.id;
        console.log('currentUserID ', currentUserID)

        const deleteQuery = 'DELETE FROM test_table WHERE id = $1';
        const deleteParams = [currentUserID];
        const deleteResult = await client.query(deleteQuery, deleteParams);

        res.locals.deletedUser = deleteResult;
        res.locals.message = 'User deleted'

    } catch (error) {
        return next({
            status: 500,
            error: error.message
        });
    }
    }
}

module.exports = databasecontroller;