const jwt = require('jsonwebtoken');
const { gameExists } = require('../helpers');

module.exports = (app) => {

  /**
   * Log in player to existiong game
   *
   * @name Player login
   * @route {POST} /login
   *
   * @param {String} name - players name
   * @param {String} key - key of the game player wants to connect to
   */
  app.post('/login', (req, res) => {
    const { name, key } = req.body;
    if(!key || !name) {
      res.send({
        error: 'Name and Key are required',
      });
    } else if (!gameExists(key)) {
      res.send({
        error: 'No such game',
      });
    } else {
      const token = jwt.sign({ name, key }, process.env.JWT_SECRET, {
        expiresIn: 24 * 60 * 60 * 1000 // 1 day
      });

      res.send({ token });
    }
  });
};
