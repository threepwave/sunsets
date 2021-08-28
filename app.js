const express = require('express');
const handlebars = require('express-handlebars');
const utils = require('./utils');
const md = require('markdown-it')();

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'hbs');
app.engine(
  'hbs',
  handlebars({
    extname: 'hbs',
    defaultLayout: 'index'
  }),
);

app.use(express.static('public'));

app.get('/:route', (req, res) => {
  res.render('piece', {
    ...utils.getNavAttributes(),
    scriptName: `${req.params.route}.js`
  });
});

app.get('*', (req, res) => {
  res.status(404).send('Not found');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
