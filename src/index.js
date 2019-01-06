const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const http = require('http');
// const uuid = require('uuid');
const Url = require('url');
const path = require('path');
const fs = require('fs');
const WebSocket = require('ws');
const { gameExists } = require('./helpers');

//
// JWT auth secret
//
process.env.JWT_SECRET = 'secret';

//
// Object containing live games
//
global.games = {
  xyze: {},
};

//
// Defining Express HTTP server
//
const app = express();
app.use(bodyParser.json());

//
// Connect Express routes
//
fs.readdirSync(path.join(__dirname, 'routes')).forEach((file) => {
  require(`./routes/${file}`)(app);
});

//
// Create HTTP server by ourselves.
//
const server = http.createServer(app);

//
// Define WebSocket server
//
const wss = new WebSocket.Server({
  verifyClient: (info, cb) => {
    const { token } = Url.parse(info.req.url, true).query;
    if (!token) {
      cb(false, 401, 'Unauthorized');
    } else {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        console.log('decoded', decoded);
        if (err) {
          cb(false, 401, 'Unauthorized');
        } else {
          info.req.user = decoded; // [1]
          cb(true);
        }
      });
    }
  },
  server,
});

wss.on('connection', (ws, req) => {
  const { name, key } = req.user;

  ws.on('message', (message) => {
    const { type, payload } = JSON.parse(message);

    switch (type) {
      case 'PLAYER_LETTER_SEND': {
        if (gameExists(key)) {
          global.games[key].addLetter(payload)
            .then(() => {
              console.log(`${name}`);
            })
            .catch();
        }
      }
        break;

      default:
        break;
    }
  });
});

//
// Start the server
//
server.listen(4000, () => console.log('Listening on http://localhost:4000'));
