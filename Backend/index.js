/* eslint-disable no-console */
const express = require('express');
const cookieParser = require('cookie-parser');
const indexroutes = require('./routes/v1/index');
const sqlConn = require('./db/db_connection');

const app = express();
require('dotenv').config();

if (!process.env.jwtPrivateKey) {
  console.error('FATAL ERROR: jwtPrivateKey not defined');
  process.exit(1);
}
app.use(cookieParser());
sqlConn.connection
  .connect()
  .then(() => console.log('DATABASE CONNCECTED...'))
  .catch((err) => console.error('connection error', err.stack));

app.use(express.json());
app.use('/api/', indexroutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
