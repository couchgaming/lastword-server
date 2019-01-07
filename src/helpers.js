/**
 * Generate an unique game key
 * @param {Number} [length] - Length of the resulting key
 * @param {String[]} [keys] - Array of keys to check against
 * @return {String}
 * @requires global.games to be defined
 */
function generateGameKey(length = 4, keys = Object.keys(global.games)) {
  let key = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  do {
    key = '';
    for (let i = 0; i < length; i++) {
      key += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    keys.push(key);
  }
  while (Object.keys(keys).length === 0 || Object.keys(keys).indexOf(key) > -1);

  return key;
}

/**
 * Check if game with the key exists
 * @param {String} key - Game key to check
 * @param {String[]} [keys] - Array of keys to check against
 * @return {Boolean}
 * @requires global.games to be defined
 */
function gameExists(key, keys = Object.keys(global.games)) {
  return keys.indexOf(key) !== -1;
}

module.exports = {
  generateGameKey,
  gameExists,
};
