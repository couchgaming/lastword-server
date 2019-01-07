const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const Game = require('../game');
const { generateGameKey } = require('../helpers');

module.exports = (app) => {

  /**
   * Create new game
   *
   * @name New game
   * @route {POST} /game
   */
  app.post('/game', (req, res) => {
    const key = generateGameKey();
    global.games[key] = new Game();

    const token = jwt.sign({ name: `host-${uuid.v4()}`, key, host: true }, process.env.JWT_SECRET, {
      expiresIn: 24 * 60 * 60 * 1000 // 1 day
    });

    res.send({ token, key });
  });

  /**
   * Read game with the key
   *
   * @name New game
   * @route {GET} /game/:key
   */
  app.get('/game/:key', (req, res) => {
    // game info
    res.send({});
  });
};
