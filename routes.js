'use strict';

module.exports = function (app) {
    var jsonku = require('./conntroller')

    app.route('/').get(jsonku.index)
    app.route("/tampil").get(jsonku.tampilDataMahasiswa)
    app.route("/tampil/:id").get(jsonku.tampilBerdasarkanID)
    app.route("/tambahData").post(jsonku.tambahDataMahasiswa)
}