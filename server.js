const { createServer } = require('node:http');
const { readSQLThenQueryDb, queryDb, sendHTML } = require('./node/utils');
const { responseStatus } = require('./constants/response-status.constant');

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
  console.log({ method, url, x: req.headers });

  const validRequest = checkApiKey(req, res, 'x-api-key');
  if (!validRequest) return;

  if (method === 'GET' && url === '/api/us_state/postal_abbr') {

    return readSQLThenQueryDb('./db/sql/table_us_state-select_postal_abbr.sql', res);
  }

  // prone to SQL Injection threat
  if (method === 'GET' && url.startsWith('/sql?query=')) {
    // e.g: /sql?query=SELECT%20*%20FROM%20accounts; => /sql?query=SELECT * FROM accounts;
    const decodedURL = decodeURI(url);
    const indexToSlice = decodedURL.indexOf('=') + 1;
    const query = decodedURL.slice(indexToSlice);

    // guard clauses against
    const sqlInjection = {
      
      batchedStatement: decodedURL
      .toUpperCase()
      .indexOf('DROP TABLE') > 0,

      // e.g: 'OR 1=1;' / 'OR =;'
      includesAlwaysTrueCondition: !decodedURL
      .match(/[a-z0-9-A-Z_]*\s?=\s?'?[a-z0-9A-Z_]*'?/g) // passes, e.g: "/sql?query=SELECT * FROM accounts WHERE username = 'jinx';"
      .every(keyValue => {
      const [_key, _value] = keyValue.split('=');
      const key = _key.trim();
      const value = _value.trim();

      return key !== value;
    })
    }

    if (sqlInjection.batchedStatement || sqlInjection.includesAlwaysTrueCondition ) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        message: 'Invalid query string parameters.'
      }));

      return;
    }

    return queryDb(query, res);
  }

  // handle preflight call
  if (method === 'OPTIONS') {
    res.writeHead(204, headers);
    res.end();

    return;
  }


  if (method === 'GET' && url.match(/^(\/)$/)) {
    
    return isListening(req, res);
  };

  if (url.match(/^(\/spa)*/)) {
    const cwd = process.cwd();
    const cd = cwd + 

    res.writeHead(200, headers);
    res.end('spa')
  }


    // if (method === 'GET' && url.match(/(\/(html|json)\/sqrt\?num=)[0-9]+$/)) {
    
  //   return getSqrt(req, res);
  // }

  // if (method === 'GET' && url.match(/(\/(html|json)\/pow\?num=)[0-9]+$/)) {
    
  //   return getPow(req. res)
  // };

    // if (method === 'GET' && url === '/select?table=accounts') {

  //   return queryDb("SELECT username FROM accounts WHERE username = 'warwick';", res);
  // }

  // res.statusCode = 400;
  // res.end();
})

server.listen(port, hostname, () => console.log(message));

// middleware
function checkApiKey(req, res, key = 'x-api-key') {
  const fetchedApiKeyFromDb = 'blah';
  
  if (!(key in req.headers)) {
    res.writeHead(responseStatus.unAuthorized, 'Missing API Key.');
    res.end();

    return false;
  }

  // check if key format is valid, 

  if (req.headers[key] !== fetchedApiKeyFromDb) {
    res.writeHead(responseStatus.forbidden, 'Wrong API Key.');
    // We don't want to expose to hacker that this is the correct resource, yet wrong API Key.
    res.writeHead(responseStatus.notFound, 'Resource not found'); 
    res.end();

    return false;
  }

}

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
