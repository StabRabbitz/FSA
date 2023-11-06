const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const path = require('path');
const PORT = 3000;
const estimateController = require('./controllers/estimatecontroller.js');
const dbcontroller = require('./controllers/databasecontroller.js');
const authcontroller = require('./controllers/authcontroller.js');
const databasecontroller = require('./controllers/databasecontroller.js');

const htmlDirectory = path.join(__dirname, 'public', 'index.html');
// Do we need a CSS directory? 

app.use(express.json());
app.use(cookieParser());

// serve HTML directory at get
app.get('/', (req, res) => {
    return res.status(200).sendFile(htmlDirectory);
  });

// no auth get request for managing basic estimate on landing page
app.get('/estimate', estimateController.estimate, (req, res) => {

})

// log-in
app.get('/login', authcontroller.login, databasecontroller.getuser, (req, res) => {

});

// sign-up
app.post('/signup', authcontroller.signup, (req, res) => {
  return res.sendStatus(200);
});

app.post('/defineuser', authcontroller.isLoggedIn, (req, res) => {

});

// route for patching user info 
app.patch('/updateuser', authcontroller.isLoggedIn, (req, res) => {

});

// auto-trigger this when userInfo is updated // updates widget
app.get('/updatedQuote', (req, res) => {

});

app.delete('/deleteuser', authcontroller.isLoggedIn, (req, res) => {

});

// global error handler 
app.use((err, req, res, next) => {
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 500,
      message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
