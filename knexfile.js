module.exports = {
  client: 'pg',
    connection: {
        host: '127.0.0.1',
        port: 5432,
        user: 'postgres',
        password: 'password',
        database: 'test'
    },
    migrations: {
        tableName: 'migrations'
    }
};
