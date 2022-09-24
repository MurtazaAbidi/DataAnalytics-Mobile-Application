/* eslint-disable no-console */
const bcrypt = require('bcrypt');
const sqlConn = require('../db/db_connection');

const adminsignup = async (signupDetails) => {
  if (!signupDetails.fullname || !signupDetails.email || !signupDetails.password) throw new Error('Required fields cannot be empty');

  const result = await sqlConn.connection.query(`SELECT * FROM admin WHERE email LIKE '${signupDetails.email}'`);
  if (result.rowCount > 0) throw new Error('Admin Already Exist.');

  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(signupDetails.password, salt);

  const insert = await sqlConn.connection.query(`INSERT INTO admin (fullname, email, password) VALUES ('${signupDetails.fullname}', '${signupDetails.email}', '${password}')`);
  if (insert.rowCount === 1) console.log('Admin Inserted.');
};

module.exports.adminsignup = adminsignup;
