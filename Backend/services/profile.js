const sqlConn = require('../db/db_connection');

const profile = async (uid) => {
  if (!uid) throw new Error('uid NOT PROVIDED');

  const details = await sqlConn.connection.query(`
        SELECT a.fullname, a.email, count(f.id) as fanscount
        FROM admin a, fans f
        WHERE a.uid = ${uid}
        GROUP BY a.fullname, a.email
    `);

  if (details.rowCount > 0) {
    return details.rows;
  }
  throw new Error('ERROR IN FETCHING ADMIN DATA');
};

module.exports.profile = profile;
