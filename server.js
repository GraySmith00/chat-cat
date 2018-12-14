const express = require('express');
const app = express();

app.get('/', (req, res, next) => {
  res.json({ message: 'hey there' });
});

app.get('/dashboard', (req, res, next) => {
  res.json({ message: 'dash' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`ChatCAT running on port ${port}`);
});
