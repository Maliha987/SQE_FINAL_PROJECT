const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes'); // Adjust the path as needed

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api', routes);

const startServer = () => {
  return app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

module.exports = { app, startServer };
