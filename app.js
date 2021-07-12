/* eslint-disable quote-props */
// import bodyParser from 'body-parser';

const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
// const flash = require('connect-flash');
// const passport = require('passport');

// custome variables
const app = express();
const port = process.env.PORT || 3000;

const studentRouter = require('./src/routes/studentRoutes');
const adminRouter = require('./src/routes/adminRoutes');
const structureRouter = require('./src/routes/structureRoutes');
const registrarRouter = require('./src/routes/registrarRoutes');

app.use(morgan('tiny'));
app.use(cors(
  {
    // "origin": "*",
    // "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    // "preflightContinue": false,
    // "optionsSuccessStatus": 204
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  }
));
// pulls json out of the post body and gives us the data
app.use(express.raw());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());

// sample
app.use(session({
  secret: 'studentrecords',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 15 }
}));

// app.use(passport.initialize());
// app.use(passport.session());
// app.use(flash());
// require('./src/config/passport.js')(app);
// app.set('views', './src/views');
// app.set('view engine', 'ejs');

// Date: 19/04/2021
app.use('/student', studentRouter);
app.use('/admin', adminRouter);
// app.use('/intake', intakeRouter);
app.use('/structure', structureRouter);
app.use('/registrar', registrarRouter);
// app.use('/report', reportRouter);
// app.use('/adminlogin', adminLoginRouter);
// app.listen(port, () => {
//   debug(`Running on port ${chalk.green(port)}`);
// });

// app.use('/studentAPI/student', studentRouter);

app.listen(port, () => {
  debug(`Running on port ${chalk.green(port)}`);
});
