const mysql = require('mysql')


// Buat Koneksi Database

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "rest-api"
})

conn.connect((err) => {
    if (err) throw err;
    console.log("Koneksi Sukses")
})

module.exports = conn;