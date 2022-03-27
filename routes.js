'use strict';

module.exports = function(app) {
    var jsonku = require('./conntroller')

    app.route('/').get(jsonku.index)
    app.route("/tampil").get(jsonku.tampilDataMahasiswa)
    app.route("/tampil/:id").get(jsonku.tampilBerdasarkanID)
    app.route("/tambahData").post(jsonku.tambahDataMahasiswa)
    app.route("/ubahData/:id").put(jsonku.ubahData)
    app.route("/hapus/:id").delete(jsonku.hapusData)
    app.route('/tampilMatakiuliah').get(jsonku.tampilGroupMatakuliah)
}