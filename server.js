const express = require('express');
const path = require('path');
const dot = require('dotenv').config('./env');

let port = process.env.PORT;
if (port === undefined || port === null) {
  port = '3030';
}

const app = express();
app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(parseInt(port, 10), function() {
  console.log("Server is running in port " + port)
});