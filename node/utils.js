const fs = require('fs');
const http = require("http");

const { client } = require('../db/client');

function readSQLThenQueryDb(sqlFilePath, res) {

  fs.readFile(sqlFilePath, (error, buffer) => {

    if (error) {
      throw error;
    } else {
      // remove '\n   ' in e.g: 'SELECT username,\n  email,\n  phone\nFROM\n  accounts;'
      const query = buffer.toString().replace(/\n(\s)*/g, ' ');

      queryDb(query, res);
    }
  })
}

function queryDb(query, res) {

  client.query(query, (error, result) => {
    const header = {'Content-Type': 'application/json'};

    if (error) {
      res.writeHead(400, header);
    } else {
      const body = JSON.stringify({
        rows: result.rows,
        rowCount: result.rowCount
      });
  
      res.writeHead(200, header);
      res.write(body);  
    }
    
    client.end();
    res.end();
  })
}

function sendHTML(
  filePath,
  res
) {
  fs.readFile(filePath, (err, readResponse) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.write(JSON.stringify({ message: "Template not found." }));
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(readResponse);
    }
    res.end();
  });
}

module.exports = {
  readSQLThenQueryDb,
  queryDb,
  sendHTML
}