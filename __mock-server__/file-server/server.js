const cors = require('cors');
const express = require('express');
const app = express();

global.__basedir = __dirname;

var corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
};

app.use(cors(corsOptions));

const initRoutes = require('./file.route');

app.use(express.urlencoded({ extended: true }));
initRoutes(app);

let port = 3003;
app.listen(port, () => {
  console.log(`Running at localhost:${port}`);
});
