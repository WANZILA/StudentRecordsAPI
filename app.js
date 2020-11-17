const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
//  const path = require('path');


const app = express();
const port = process.env.PORT || 3000;

const homerouter = express.Router();

app.use(morgan('tiny'));
app.set('views', './src/views');
app.set('view engine', 'ejs');

homerouter.route('/home')
  .get((req, res) => {
    res.send('hellow people');
  });

app.use('/', homerouter);
app.get('/', (req, res) => {
  // res.send('hellow');
  // res.sendFile(path.join(__dirname, 'views/index.html'));
  res.render(
    'index',
    {
      nav: [
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
      ],
      title: 'Student Records System'
    }
  );
});

app.listen(port, () => {
  debug(`Running on port ${chalk.green(port)}`);
});
