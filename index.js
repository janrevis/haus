const express = require('express');
const path = require('path');
const app = express();
const routes = require('./routes');
const port = process.env.PORT || 4000;

app.use(express.static('./public'));
app.use('/comment', routes)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
