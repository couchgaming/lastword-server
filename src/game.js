const fs = require('fs');
const Nodehun = require('nodehun');
const path = require('path');
const StateMachine = require('javascript-state-machine');

const affbuf = fs.readFileSync(path.resolve(__dirname, 'dictionaries/ru_RU/ru_RU.aff'));
const dictbuf = fs.readFileSync(path.resolve(__dirname, 'dictionaries/ru_RU/ru_RU.dic'));
const dict = new Nodehun(affbuf, dictbuf);

module.exports = StateMachine.factory({
  init: 'newGame',
  transitions: [
    { name: 'start', from: 'newGame', to: 'letterEntry' },
    { name: 'showResult', from: 'letterEntry', to: 'letterResult' },
    { name: 'nextPlayer', from: 'letterResult', to: 'letterEntry' },
    { name: 'showRoundScore', from: 'letterResult', to: 'roundScore' },
    { name: 'showIntermediateScore', from: 'roundScore', to: 'intermediateScore' },
    { name: 'nextRound', from: 'intermediateScore', to: 'letterEntry' },
    { name: 'showFinalScore', from: 'intermediateScore', to: 'finalScore' },
    { name: 'startNewGame', from: 'finalScore', to: 'newGame' },
  ],
  methods: {
    onStart: () => {
      // 1. Provide first letter
      // 2. Shuffle players and form queue
      // 3. Show "Letter entry" interface to the first player in queue
      // 4. Start countdown for letter entry, when it is exceeded go to next step
      // 5. Wait player to provide letter
    },
    onShowResult: () => {
      // 1. Validate players entry
      // 2. Go to next player if game hasn't ended
      // 3. Got to round score if it is last entry
    },
    onShowRoundScore: () => {
      // 1. Calculate
    },

    /**
     * Add one more letter to complete the word
     */
    addLetter: (letter) => new Promise((resolve, reject) => {
      dict.spellSuggestions(`${this.word}${letter}/`, (err, correct, suggestion, origWord) => {
        console.log(err, correct, suggestion, origWord);
        if (!err && (suggestion.lenght || correct)) {
          this.word += letter;
          return resolve();
        }
        return reject();
      });
    })
  },
});
