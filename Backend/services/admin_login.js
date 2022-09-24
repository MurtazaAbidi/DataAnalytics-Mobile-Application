const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sqlConn = require('../db/db_connection');

const adminlogin = async (loginDetails) => {
  if (!loginDetails.email || !loginDetails.password) throw new Error('Required fields cannot be empty');

  const result = await sqlConn.connection.query(`SELECT * FROM admin WHERE email LIKE '${loginDetails.email}'`);
  if (result.rowCount === 0) throw new Error('Admin Does Not Exist.');

  else {
    const validPassword = await bcrypt.compare(loginDetails.password, result.rows[0].password);

    if (!validPassword) {
      throw new Error('Invalid Password');
    } else {
      const { uid } = result.rows[0];
      const token = jwt.sign({ id: uid }, process.env.jwtPrivateKey, { expiresIn: '3d' });
      return token;
    }
  }
};

module.exports.adminlogin = adminlogin;
