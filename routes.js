'use strict';

module.exports = function (app) {
    var jsonku = require('./conntroller')

    app.route('/').get(jsonku.index)
    app.route("/tampil").get(jsonku.tampilDataMahasiswa)
}