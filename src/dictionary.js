// const path = require('path')
// const ru = require('dictionary-ru')
// // const Typo = require('typo-js')
// // const dictionary = new Typo('ru_RU', false, false, { dictionaryPath: path.resolve(__dirname, 'dictionaries') })

// // const suggestions = dictionary.check('миска')
// // console.log(suggestions)

// const nspell = require('nspell')

// ru((err, dictionary) => {
//     const spell = nspell(dictionary)
//     console.log(spell.suggest('угон/K'))
// })


const fs = require('fs');
const path = require('path');
const Nodehun = require('nodehun');
const affbuf = fs.readFileSync(path.resolve(__dirname, 'dictionaries/ru_RU/ru_RU.aff'));
const dictbuf = fs.readFileSync(path.resolve(__dirname, 'dictionaries/ru_RU/ru_RU.dic'));
// const affbuf = fs.readFileSync(path.resolve(__dirname, 'dictionaries/en_US/en_US.aff'));
// const dictbuf = fs.readFileSync(path.resolve(__dirname, 'dictionaries/en_US/en_US.dic'));
const dict = new Nodehun(affbuf, dictbuf);
// dict.spellSuggest('colo/', (err, correct, suggestion, origWord) => {
//     console.log(err, correct, suggestion, origWord);
//     // because "color" is a defined word in the US English dictionary
//     // the output will be: null, true, null, 'color'
// });

dict.spellSuggestions('арбузо/', (err, correct, suggestion, origWord) => {
  console.log(err, correct, suggestion, origWord);
  // because "calor" is not a defined word in the US English dictionary
  // the output will be: null, false, "carol", 'calor'
});

// console.log('new info');
