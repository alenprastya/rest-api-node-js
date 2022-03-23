'use strict';

module.exports = function (app) {
    var jsonku = require('./conntroller')

    app.route('/').get(jsonku.index)
}