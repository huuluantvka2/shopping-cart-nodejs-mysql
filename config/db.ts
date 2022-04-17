import mysql from 'mysql2'
export default mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'shoppingcart_react',
    waitForConnections: true,
    connectionLimit: 100,
    queueLimit: 0
});