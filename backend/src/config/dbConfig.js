const { text } = require('body-parser')
const { error, log } = require('node:console')
const {Pool} = require('pg')
require('dotenv').config()

const pool = new Pool({
    host: process.env.RDS_HOSTNAME,
    port: process.env.RDS_PORT,
    database: process.env.RDS_DB_NAME,
    user: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,

    idleTimeoutMillis: 30000, //automatically close connection after 3 min when not used
    connectionTimeoutMillis: 2000 // Error notification after 2 second freezin
})

const connectDB = async () => {
    try {
        const res = await pool.query('SELECT NOW()');
        console.log('Database Connected Successfully!!!');
    } catch (err) {
        console.error('Failed to connect to Database!!!')
    }
};

module.exports = {
    query: (text, param) => pool.query(text, param),
    pool, // For Trancition purpose
    connectDB
}