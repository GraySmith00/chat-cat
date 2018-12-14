const express = require('express');
const app = express();
const chatCat = require('./app');

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use('/', chatCat.router);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`ChatCAT running on port ${port}`);
});
