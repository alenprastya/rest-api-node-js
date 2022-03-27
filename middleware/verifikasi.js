const { JsonWebTokenError } = require("jsonwebtoken");
const config = require('../config/secret')


function verifikasi() {
    return function(req, rest, next) {
        var role = req.body.role;
        // Cek Authorizzation Header
        var tokenWithBearer = req.headers.authrization;
        if (tokenWithBearer) {
            var token = tokenWithBearer.split('')[1];
            jwt.verify(token, config.secret, function(err, decoded) {
                if (err) {
                    return rest.status(401).send({
                        auth: false,
                        message: "Token Tidak Terdaftar"
                    })
                } else {
                    if (roles == 1) {
                        req.auth = decoded;
                        next();
                    } else {
                        return rest.status(401).send({
                            auth: false,
                            message: "Gagal Mengotorisasi Roll Anda"
                        })
                    }
                }
            })
        } else {
            return rest.status(401).send({
                auth: false,
                message: "Token Tidak Tersedia"
            })
        }
    }
}

module.exports = verifikasi