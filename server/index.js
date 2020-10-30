const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 8080;
const bodyParser = require('body-parser')
const app = express()
const fs = require("fs")//d

app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:1344');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.header('Access-Control-Allow-Credentials', true);
    next();
});

const { spawn } = require('child_process');

app.use('/', express.static(path.join(__dirname, 'dist')))

app.all('*/**', (req, res) => {
    res.status(200).sendFile(path.join(__dirname,"dist/index.html"));
});

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
