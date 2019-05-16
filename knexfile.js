module.exports = {
  client: 'mysql2',
  connection: {
      host: process.env.MYSQL_HOST || 'localhost',
      user: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASSWORD || '123',
      database: process.env.MYSQL_DATABASE || 'dating1',
      charset  : 'utf8',
      dateString : true
  }
};