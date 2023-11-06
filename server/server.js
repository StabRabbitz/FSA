const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const path = require('path');
const PORT = 3000;
const estimateController = require('./controllers/estimatecontroller.js');
const dbcontroller = require('./controllers/databasecontroller.js');
const authcontroller = require('./controllers/authcontroller.js');
const databasecontroller = require('./controllers/databasecontroller.js');
const cors = require('cors');

const htmlDirectory = path.join(__dirname, 'public', 'index.html');
// Do we need a CSS directory? 
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// serve HTML directory at get
app.get('/', (req, res) => {
    return res.status(200).sendFile(htmlDirectory);
  });

// no auth get request for managing basic estimate on landing page
app.post('/estimate', estimateController.estimate, (req, res) => {
  return res.status(200).json({ 
    estimate: res.locals.estimate, 
    difference: res.locals.difference});
})
// tested? [x]

// log-in
const apiRouter = express.Router();
app.use('/api', apiRouter);

// John note: removing databasecontroller.getuser. Should this be a get request?
apiRouter.post('/login', authcontroller.login, (req, res) => {
  res.status(200).json(res.locals.user);
});

// TEST ROUTE

// apiRouter.get('api/test', (req, res) => res.status(200).send('Succees from TEST GET request'));
apiRouter.get('/test', (req, res) => {
  console.log('Test route worked');
  return res.status(200).json({message: 'Succees from TEST GET request'})

});


// tested? x 

// sign-up
app.post('/signup', authcontroller.signup, (req, res) => {
  return res.status(200).json(res.locals.message);
});

// tested? x
   

// route for patching user info 
app.patch('/updateuser', authcontroller.isLoggedIn, databasecontroller.updateUser, (req, res) => {
  return res.status(200).json(res.locals.message);
});

// ** John testing for authcontroller.isLoggedIn
app.get('/isLoggedIn', authcontroller.isLoggedIn, (req, res) => res.sendStatus(200))

// auto-trigger this when userInfo is updated // updates widget
app.get('/updatedQuote', (req, res) => {

});

// need to look at locals id persistence once auth is in place 

app.delete('/deleteuser', authcontroller.isLoggedIn, databasecontroller.deleteuser, (req, res) => {
  return res.status(200).json(res.locals.message);
});

// tested x 

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

  // tested x 

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
