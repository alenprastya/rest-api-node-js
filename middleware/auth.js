var connection = require('../koneksi')
var mysql = require('mysql')
var md5 = require('md5')
var response = require('../res')
var jwt = require('jsonwebtoken')
var config = require('../config/secret')
var ip = require('ip')

// Controller unruk Register

exports.registrasi = function(req, res) {
    var post = {
            username: req.body.username,
            email: req.body.email,
            password: md5(req.body.password),
            role: req.body.role,
            tanggal_daftar: new Date()
        }
        // Cek Apakkah email sudah terdaftar atau belum
    var query = "SELECT email FROM ?? WHERE ??=?";
    var table = ["user", "email", post.email]
    query = mysql.format(query, table)
        // Melakukan Querry
    connection.query(query, function(error, rows) {
        if (error) {
            console.log(error)
        } else {
            if (rows.length == 0) {
                var query = "INSERT INTO ?? SET ?";
                var table = ["user"]
                query = mysql.format(query, table)
                connection.query(query, post, function(error, rows) {
                    if (error) {
                        console.log(error)
                    } else {
                        response.ok("Berhasil Menambahkan Data User Baru", res)
                    }
                });
            } else {
                response.ok("Email Sudah terdaftar", res)
            }
        }
    })
}

// Controller Login

exports.login = function(req, res) {
    var post = {
        password: req.body.password,
        email: req.body.email
    }

    var query = "SELECT * FROM ?? WHERE ??=? AND ??=?";
    var table = ["user", "password", md5(post.password), "email", post.email];

    query = mysql.format(query, table);
    connection.query(query, function(error, rows) {
        if (error) {
            console.log(error)
        } else {
            if (rows.length == 1) {
                var token = jwt.sign({ rows }, config.secret, {
                    expiresIn: 1440
                });
                id_user = rows[0].id;

                var data = {
                    id_user: id_user,
                    akses_token: token,
                    ip_address: ip.address,
                }

                var query = "INSERT INTO ?? SET ?";
                var table = ["akses_token"]

                query = mysql.format(query, table);
                connection.query(query, data, function(error, rows) {
                    if (error) {
                        console.log(error)
                    } else {
                        res.json({
                            success: true,
                            message: "Token JWT Tergenerate",
                            token: token,
                            currUser: data.id_user

                        })
                    }
                })
            } else {
                res.json({
                    "Error": true,
                    "Message ": "Email Atau Password salah !"
                })
            }
        }
    })
}

exports.halamanRahasia = function(req, res) {
    response.ok("Halaman Ini hanya Untuk User Role = 2", res)
}