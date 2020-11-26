const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');

// const expressSanitized = require('express-sanitize-escape');
const cors = require('cors');

const mysql = require('mysql');
//  const path = require('path');


const app = express();
const port = process.env.PORT || 3000;

const homeRouter = express.Router();
const registryRouter = express.Router();

// db connections
const pool = mysql.createPool({
  connectionLimit: 100,
  host: 'localhost',
  user: 'root',
  password: '',
  // server: 'localhost',
  database: 'studentRecords',
  flags: '+IGNORE_SPACE'
});

// testing connection
// eslint-disable-next-line prefer-arrow-callback
pool.query('SELECT 1 + 1 AS solution', function qns(error, results, fields) {
  if (error) {
    return debug(error);
  };
  console.log('connected ');
});

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
const studentRouter = require('./src/routes/studentRoutes')(nav, title, pool);

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(expressSanitized());
app.use(cors());

app.use(morgan('tiny'));
app.set('views', './src/views');
app.set('view engine', 'ejs');

homeRouter.route('/home')
  .get((req, res) => {
    res.send('hellow people');
  });

registryRouter.route('/registry')
  .get((req, res) => {
    res.send('reg hellow');
  });

app.use('/', homeRouter);
app.use('/', registryRouter);
app.use('/student', studentRouter);

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
