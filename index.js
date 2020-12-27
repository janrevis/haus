const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const crypto = require('crypto');

const app = express();
const routes = require('./routes');
const port = process.env.PORT || 4000;

app.use(session({secret: 'cjkdoshjkl7fwer'}));
app.use(bodyParser.json());
app.use('/api', routes);
app.use(express.static('./public'));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

module.exports = app;
