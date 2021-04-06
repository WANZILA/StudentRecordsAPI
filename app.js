// import bodyParser from 'body-parser';

const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
// const passport = require('passport');

// custome variables
const app = express();
const port = process.env.PORT || 3000;
// main navigation
const nav = [
  { link: '/home', title: 'Home' },
  { link: '/admin', title: 'Admin' },
  { link: '/registry', title: 'Registry' },
  { link: '/structure', title: 'Structure' },
  { link: '/lecturer', title: 'Lecturers' },
  { link: '/student', title: 'Student' },
  { link: '/communications', title: 'Communication' },
  { link: '/payment', title: 'Payment' },
  { link: '/library', title: 'Library' },
  { link: '/report', title: 'Report' }
];

const title = { title: 'Student Records System' };
const studentRouter = require('./src/routes/studentRoutes')(nav, title);
const adminRouter = require('./src/routes/adminRoutes')();
const intakeRouter = require('./src/routes/intakeRoutes')();
const structureRouter = require('./src/routes/structureRoutes')();
const registrarRouter = require('./src/routes/registrarRoutes')();
const reportRouter = require('./src/routes/reportRoutes')();
const adminLoginRouter = require('./src/routes/adminLoginRoutes');

app.use(morgan('tiny'));
app.use(cors());
// pulls json out of the post body and gives us the data
// app.use(bodyParser.json());
// app.use(express.json());
// making use of bodyParser
 // app.use(bodyParser.urlencoded({ extended: true }));
 app.use(express.raw());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.raw());
app.use(cookieParser());
// app.use(session({ secret: 'studentrecords' }));

// sample
app.use(session({
  secret: 'studentrecords',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 15 }
}));

// app.use(passport.initialize());
// app.use(passport.session());
app.use(flash());

// require('./src/config/passport.js')(app);
app.set('views', './src/views');
app.set('view engine', 'ejs');
app.use('/student', studentRouter);
app.use('/admin', adminRouter);
app.use('/intake', intakeRouter);
app.use('/structure', structureRouter);
app.use('/registrar', registrarRouter);
app.use('/report', reportRouter);
app.use('/adminlogin', adminLoginRouter);

app.listen(port, () => {
  debug(`Running on port ${chalk.green(port)}`);
});
