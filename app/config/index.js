if (process.env.NODE === 'production') {
  module.exports = {
    host: process.env.host || '',
    dbURI: process.env.dbURI
  };
} else {
  module.exports = require('./development.json');
}
