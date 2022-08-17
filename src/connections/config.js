const path = require('path')

const configMariaDB = {
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        port: 3307,
        password: '',
        database: 'ecommerce'
    },
    pool: {min: 0, max: 7}
}
const configSqlite = {
    client: 'sqlite3',
    connection: {
        filename: path.join(__dirname, '../db/ecommerce.sqlite')
    },
    useNullAsDefault: true
}

const configMongodb = {
    connectionString : "mongodb://localhost:27017/coderMensajes"
}



module.exports = {
    configMariaDB,
    configSqlite,
    configMongodb
}