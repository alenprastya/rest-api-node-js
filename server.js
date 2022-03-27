const express = require('express');
const bodyParser = require("body-parser")
const morgan = require('morgan')
const app = express();


// parser Aplikasi JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

// Panggil Routes
var routes = require('./routes')
routes(app)

// Daftarkan Menu Routes dari Index


app.use('/auth', require("./middleware"))

app.listen(port = 3000, () => {
    console.log("Server Started On Port : ", port)
})