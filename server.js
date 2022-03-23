const express = require('express');
const bodyParser = require("body-parser")
const app = express();


// parser Aplikasi JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Panggil Routes
var routes = require('./routes')
routes(app)
app.listen(port = 3000, () => {
    console.log("Server Started On Port : ", port)
})