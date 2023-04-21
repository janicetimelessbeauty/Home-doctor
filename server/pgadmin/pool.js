const Pool = require('pg').Pool
const pool = new Pool({
    host: "localhost",
    user: "postgres",
    password: "Nga123456@",
    port: 5432,
    database: "fever"
})
module.exports = pool