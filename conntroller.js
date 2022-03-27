'use strict'

var response = require('./res');
var connection = require('./koneksi');
const conn = require('./koneksi');

exports.index = function(req, res) {
    response.ok("Aplikasi Rest API Berjalan", res);
};


// Menampillan Semua Data Mahasiswa

exports.tampilDataMahasiswa = function(req, res) {
    connection.query('SELECT * FROM mahasiswa', function(error, rows, fields) {
        if (error) {
            console.log(error)
        } else {
            response.ok(rows, res)
        }
    });
};

// Tampilakan data berdasarkan ID

exports.tampilBerdasarkanID = function(req, res) {
    let id = req.params.id;
    connection.query("SELECT * FROM mahasiswa WHERE id_mahasiswa = ?", [id],
        function(error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok(rows, res)
            }
        }
    )
}

// Menambahkan Data Mahasiswa

exports.tambahDataMahasiswa = function(req, res) {
    var npm = req.body.npm;
    var nama = req.body.nama;
    var jurusan = req.body.jurusan;

    connection.query('INSERT INTO mahasiswa (npm,nama,jurusan) VALUES(?,?,?)', [npm, nama, jurusan],
        function(error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok("Berhasil Menambahkan Data", res)
                console.log("Berhasil menambahkan Data Mahasiswa")
            }
        });
}

// Ubah data Berdasarkan ID mahasiswa


exports.ubahData = function(req, res) {
    let id = req.params.id;
    var npm = req.body.npm;
    var nama = req.body.nama;
    var jurusan = req.body.jurusan;

    connection.query("UPDATE mahasiswa SET npm=?, nama=?, jurusan=? WHERE id_mahasiswa=?", [npm, nama, jurusan, id],
        function(error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.ok("Berhasil Update Data Mahasiswa", res)
                console.log("Berhasil Ubah Data Mahasiswa")
            }
        }
    )
}

// Hapus Data Mahasiswa 

exports.hapusData = function(req, res) {
    let id = req.params.id;
    connection.query("DELETE FROM mahasiswa where id_mahasiswa=?", [id],
        function(error, rows, fields) {
            if (id = "null") {
                var data = {
                    Status: "500",
                    Value: "Gagal menghapus Data"
                }
                res.json(data);
            } else {
                response.ok("Berhasil Mennghapus data Mahasiswa", res)
            }
        }
    )

}


// Menampilan Matakuliah Group

exports.tampilGroupMatakuliah = function(req, res) {
    connection.query("SELECT mahasiswa.id_mahasiswa, mahasiswa.npm, mahasiswa.nama, mahasiswa.jurusan, matakuliah.matakuliah, matakuliah.sks from krs join matakuliah JOIN mahasiswa WHERE krs.id_matakuliah = matakuliah.id_matakuliah AND krs.id_mahasiswa = mahasiswa.id_mahasiswa ORDER BY mahasiswa.id_mahasiswa",
        function(error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                response.okNested(rows, res)
            }
        }
    )

}