const sqlConn = require('../db/db_connection');

const dataAnalytics = async () => {
  const totalResult = {};

  const funnel1 = await sqlConn.connection.query(`
  
    SELECT count("home_page.user_id") "home_page", count("search_page.user_id") "search_page", count("payment_page.user_id") "payment_page", count("payment_confirm.user_id") "payment_confirm", count("search_page.user_id") "search_page", count("payment_page.user_id") "payment_page", count(user_id) "user"
    from (
        SELECT users.*, home_page.user_id as "home_page.user_id", home_page.page as "home_page.page", search_page.user_id as "search_page.user_id", search_page.page as "search_page.page", payment_page.user_id as "payment_page.user_id", payment_page.page as "payment_page.page", payment_confirm.user_id as "payment_confirm.user_id", payment_confirm.page as "payment_confirm.page"
        FROM users
        left JOIN home_page
            ON users.user_id = home_page.user_id
        left JOIN search_page
            ON users.user_id = search_page.user_id
        left JOIN payment_page
            ON users.user_id = payment_page.user_id
        left JOIN payment_confirm
            ON users.user_id = payment_confirm.user_id   
        ) 
    as nested`);

  if (funnel1.rowCount > 0) {
    totalResult.funnel1 = funnel1.rows;
  } else {
    throw new Error('ERROR IN FETCHING DATA');
  }

  const barGraph = await sqlConn.connection.query(`
  
  SELECT month, SUM(CAST(nested.home_page as int)) "home_page", SUM(CAST(nested.search_page as int)) "search_page", SUM(CAST(nested.payment_page as int)) "payment_page", SUM(CAST(nested.payment_confirm as int)) "payment_confirm"

  from (
      SELECT users.*, 
      case 
      when home_page.page = 'home_page' then '1' 
      else '0' 
      end as "home_page" ,
  
      case 
      when search_page.page = 'search_page' then '1' 
      else '0' 
      end as "search_page" ,
  
      case 
      when payment_page.page = 'payment_page' then '1' 
      else '0' 
      end as "payment_page" ,
  
      case 
      when payment_confirm.page = 'payment_confirmation_page' then '1' 
      else '0' 
      end as "payment_confirm" ,
  
      EXTRACT(MONTH from date) AS Month
      FROM users
          left JOIN home_page
              ON users.user_id = home_page.user_id
          left JOIN search_page
              ON home_page.user_id = search_page.user_id
          left JOIN payment_page
              ON search_page.user_id = payment_page.user_id
          left JOIN payment_confirm
              ON payment_page.user_id = payment_confirm.user_id
  ) as nested
  group by nested.month
  order by nested.month`);

  if (barGraph.rowCount > 0) {
    totalResult.barGraph = barGraph.rows;
  } else {
    throw new Error('ERROR IN FETCHING DATA');
  }

  const devices = await sqlConn.connection.query(`
  
  SELECT device, SUM(CAST(nested.home_page as int)) "home_page", SUM(CAST(nested.search_page as int)) "search_page", SUM(CAST(nested.payment_page as int)) "payment_page", SUM(CAST(nested.payment_confirm as int)) "payment_confirm"

  from (
      SELECT users.*, 
      case 
       when home_page.page = 'home_page' then '1' 
       else '0' 
      end as "home_page" ,
  
      case 
       when search_page.page = 'search_page' then '1' 
       else '0' 
      end as "search_page" ,
  
      case 
       when payment_page.page = 'payment_page' then '1' 
       else '0' 
      end as "payment_page" ,
  
      case 
       when payment_confirm.page = 'payment_confirmation_page' then '1' 
       else '0' 
      end as "payment_confirm" ,
  
      EXTRACT(MONTH from date) AS Month
      FROM users
          full JOIN home_page
              ON users.user_id = home_page.user_id
          full JOIN search_page
              ON users.user_id = search_page.user_id
          full JOIN payment_page
              ON users.user_id = payment_page.user_id
          full JOIN payment_confirm
              ON users.user_id = payment_confirm.user_id
  ) as nested
  group by nested.device`);

  if (devices.rowCount > 0) {
    totalResult.unknownQuery4 = devices.rows;
  } else {
    throw new Error('ERROR IN FETCHING DATA');
  }

  const unknownQuery5 = await sqlConn.connection.query(`
    SELECT * 
    FROM frequent_item
    ORDER BY created_at DESC
    LIMIT 1
  `);

  if (unknownQuery5.rowCount > 0) {
    totalResult.unknownQuery5 = unknownQuery5.rows;
    return totalResult;
  }
  throw new Error('ERROR IN FETCHING DATA');
};

module.exports.dataAnalytics = dataAnalytics;
