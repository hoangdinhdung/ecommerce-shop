module.exports = {
  "development": {
    "username": "root",
    "password": '',
    "database": "babieka_db",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "define": {
      "underscored": true
    }
  },
  "test": {
    "username": "root",
    "password": '',
    "database": "babieka_db",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "define": {
      "underscored": true
    }
  },
  "production": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": "mysql",
    "define": {
      "underscored": true
    }
  }
}