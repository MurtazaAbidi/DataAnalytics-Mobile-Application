/* eslint-disable max-len */
const bcrypt = require('bcrypt');
const sqlConn = require('../db/db_connection');

const changePassword = async (changePasswordDetails) => {
  if (!changePasswordDetails.uid || !changePasswordDetails.password || !changePasswordDetails.newPassword) { throw new Error('DETAILS NOT PROVIDED NOT PROVIDED'); }

  const result = await sqlConn.connection.query(`
        SELECT password
        FROM admin
        WHERE uid = ${changePasswordDetails.uid}
    `);

  const validPassword = await bcrypt.compare(changePasswordDetails.password, result.rows[0].password);

  if (!validPassword) {
    throw new Error('Invalid Old Password');
  } else {
    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(changePasswordDetails.newPassword, salt);

    const newresult = await sqlConn.connection.query(`
            UPDATE admin
            SET password = '${newPassword}'
            WHERE uid = ${changePasswordDetails.uid}
        `);

    if (newresult.rowCount === 1) return changePasswordDetails.uid;
    throw new Error('PASSWORD CANNOT BE CHANGED');
  }
};

module.exports.changePassword = changePassword;
