const { Pool:POOL } = require('pg');
//require('dotenv').config();
const pool = new POOL({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
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