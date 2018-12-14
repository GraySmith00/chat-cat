const express = require('express');
const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res, next) => {
  res.render('login', { pageTitle: 'My Login Page' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`ChatCAT running on port ${port}`);
});
