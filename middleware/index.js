const express = require('express');
const auth = require('./auth');
const verifikasi = require('./verifikasi');
const router = express.Router();

router.post("/api/v1/register", auth.registrasi)
router.post("/api/v1/login", auth.login)


// Alamat Yang perlu Otorisasi
router.get("/api/v1/rahasia", verifikasi(), auth.halamanRahasia)
module.exports = router;