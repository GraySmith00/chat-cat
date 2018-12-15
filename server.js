const express = require('express');
const app = express();
const chatCat = require('./app');
const passport = require('passport');

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(chatCat.session);
app.use(passport.initialize());
app.use(passport.session());
app.use('/', chatCat.router);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`ChatCAT running on port ${port}`);
});
