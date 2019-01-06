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

    res.send({ key });
  });
};
