/* eslint-disable no-unused-vars */
const sqlConn = require('../db/db_connection');

const homepage = async () => {
  const totalResult = {};
  const ages = await sqlConn.connection.query(`
  
  select t.blah as ages, count(*) as number_of_occurences

  from (
        select case 
          when age between 18 and 20 then '18-20'
          when age between 21 and 24 then '21-24'
          when age between 25 and 29 then '25-29'
          when age between 30 and 39 then '30-39'
          when age between 40 and 49 then '40-49'
          when age between 50 and 59 then '50-59'
          when age between 60 and 69 then '60-69'
          when age between 70 and 79 then '70-79'
          when age between 80 and 89 then '80-89'
          else 'others' 
      end as blah
        from fans) t 
      
  group by t.blah
  order by ages;`);

  if (ages.rowCount > 0) {
    totalResult.age = ages.rows;
  } else {
    throw new Error('ERROR IN FETCHING AGES');
  }

  const gender = await sqlConn.connection.query(`  
  select t.blah as gender, count(*) as number_of_occurences
  from (
        select case 
          when gender = 'M' then 'Male'
          else 'Female' 
      end as blah
        from fans) t 
      
  group by t.blah;`);

  if (gender.rowCount > 0) {
    totalResult.gender = gender.rows;
  } else {
    throw new Error('ERROR IN FETCHING GENDER');
  }

  const browser = await sqlConn.connection.query(`  
  SELECT browser, count(browser)
  FROM fans
  GROUP BY browser;`);

  if (browser.rowCount > 0) {
    totalResult.browser = browser.rows;
  } else {
    throw new Error('ERROR IN FETCHING BROWSER');
  }

  const transactions = await sqlConn.connection.query(`  
  SELECT m.name, sum((t.merchandise ->> 'qty')::int) AS total_quantity, sum((t.merchandise ->> 'qty')::int) * m.price as total_price
  FROM transactions as t
  INNER JOIN merchandise as m
  ON (t.merchandise ->> 'id')::int = m.id
  GROUP BY m.name, m.price
  ORDER BY total_price DESC;`);

  if (transactions.rowCount > 0) {
    totalResult.transactions = transactions.rows;
  } else {
    throw new Error('ERROR IN FETCHING TRANSACTIONS');
  }

  return totalResult;
};

module.exports.homepage = homepage;
