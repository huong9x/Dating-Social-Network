require('dotenv').config({ path: 'local.env'});
// console.log(process.env.DB_CLIENT, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, process.env.MYSQL_DATABASE, process.env.MYSQL_HOST);

module.exports = {
  client: process.env.DB_CLIENT,
  connection: {
      charset  : 'utf8',
      dateString : true,
      host: process.env.MYSQL_HOST || '127.0.0.1',
      user: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASSWORD || '123',
      database: process.env.MYSQL_DATABASE || 'dating1'
      
  },
  pool: {
      min: 2,
      max: 10,
      afterCreate: function(conn, cb) {
        conn.query('SET sql_mode="NO_ENGINE_SUBSTITUTION";', function (err) {
          cb(err, conn);
        });
      }
  },
  migrations: {
      directory: __dirname + '/resources/Database/migrations/',
      tableName: 'migrations'
  },
  seeds: {
      directory: __dirname + '/resources/Database/seeds'
  }
};