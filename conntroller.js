'use strict'

var response = require('./res');
var connection = require('./koneksi');
const conn = require('./koneksi');

exports.index = function (req, res) {
    response.ok("A[likasi Rest API Berjalan", res);
};


// Menampillan Semua Data Mahasiswa

exports.tampilDataMahasiswa = function (req, res) {
    connection.query('SELECT * FROM mahasiswa', function (error, rows, fields) {
        if (error) {
            console.log(error)
        } else {
            response.ok(rows, res)
        }
    });
};

// Tampilakan data berdasarkan ID

exports.tampilBerdasarkanID = function (req, res) {
    let id = req.params.id;
    connection.query("SELECT * FROM mahasiswa WHERE id_mahasiswa = ?", [id],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            }
        }
    )
}