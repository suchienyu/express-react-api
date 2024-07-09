const { Pool:POOL } = require('pg');
const pool = new POOL({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'password',
  port: 5432,
  max: 5
});

  
pool.connect((err) => {
    if (err) {
      console.error('連接失敗', err);
    } else {
      console.log('有連上資料庫');
      pool.query('SELECT NOW()', (err, res) => {
        if (err) {
          console.error('查詢失敗', err);
        } else {
          console.log('當前時間:', res.rows[0]);
        }
        
      });
    }

  });

  
  module.exports = pool;