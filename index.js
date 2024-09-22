const { createServer } = require('node:http');

const hostname = '127.0.0.1';
const port = 3000;
const message = `Server is listening at http://${hostname}:${port}`;
const time = {
  second: 1000, // ms
  minute: 60, // seconds
  hour: 60, // minutes
  day: 24, // hours
}
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'OPTIONS, POST, GET, PUT, PATCH, DELETE, HEAD',
  'Access-Control-Max-Age': 30 * time.day * time.hour * time.minute * time.second
}

const server = createServer((req, res) => {
  const { method, url } = req;

  if (method === 'OPTIONS') {
    res.writeHead(204, headers);
    res.end();

    return;
  }

  if (method === 'GET' && url.match(/(\/(html|json)\/sqrt\?num=)[0-9]+$/)) {
    
    return getSqrt(req, res);
  }

  if (method === 'GET' && url.match(/(\/(html|json)\/pow\?num=)[0-9]+$/)) {
    
    return getPow(req. res)
  };

  if (method === 'GET' && url.match(/^(\/)$/)) {
    
    return isListening(req, res);
  };

  res.statusCode = 400;
  res.end();
})

server.listen(port, hostname, () => console.log(message));

function isListening(_req, res) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end(message);
}

function getSqrt(req, res) {
  const regex = {
    number: /[0-9]+$/
  }
  const query = req.url.match(regex.number);
  const number = Number(query);
  const result = Math.sqrt(number);

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');

  return res.end(JSON.stringify({
    number,
    operation: 'sqrt',
    result,
  }))  
}

function getPow(_req, res) {
  const regex = {
    number: /[0-9]+$/
  }
  const query = url.match(regex.number);
  const number = Number(query);
  const result = number * number;

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');

  return res.end(JSON.stringify({
    input,
    operation: 'pow',
    output,
  }))  
}

function preflight(_req, res) {
    res.writeHead(204, headers);
    res.end();

    return;
}