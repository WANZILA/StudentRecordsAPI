const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

// custome variables
const app = express();
const port = process.env.PORT || 3000;

const homeRouter = express.Router();
const registryRouter = express.Router();


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


app.use(cors());
// making use of bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
// pulls json out of the post body and gives us the data
app.use(bodyParser.json());
// app.use(expressSanitized());

app.use(morgan('tiny'));
app.set('views', './src/views');
app.set('view engine', 'ejs');

// homeRouter.route('/home')
//   .get((req, res) => {
//     res.send('hellow people');
//   });

// registryRouter.route('/registry')
//   .get((req, res) => {
//     res.send('reg hellow');
//   });

// app.use('/', homeRouter);
// app.use('/', registryRouter);
app.use('/student', studentRouter);
app.use('/admin', adminRouter);
app.use('/intake', intakeRouter);
app.use('/structure', structureRouter);

app.get('/', (req, res) => {
  // res.send('hellow');
  // res.sendFile(path.join(__dirname, 'views/index.html'));
  res.render(
    'index',
    {
      nav,
      title: 'Student Records System'
    }
  );
});

app.listen(port, () => {
  debug(`Running on port ${chalk.green(port)}`);
});
