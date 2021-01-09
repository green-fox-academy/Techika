// vowel = maganhangzo
// consonant = mássalhangzó

//input: 2-5 string

// Checklist:
// ✓ the licence plate can contain a 2-5 letter long string and no numeric values, only alphabetical
// if the licence plate starts with a vowel, the word also has to start with the same vowel
// if it starts with a consonant, it can start with any vowel but after the vowel(s) this consonant should come
// after vowels if the next letter on the licence plate is a consonant then this consonant should come as next,
// if the next letter on the licence plate is a vowel other consonants can come between them
// after consonants if the next letter on the licence plate is a consonant then any vowel(s) can come between them
// but if the next character in the licence plate is a vowel then no other letter can come between them

// ✓ to ask the user for input
// ✓ validate the input
// parse and search through the terms in the file
// use exception handling for both validating the input and reading the file
// return a list of possible words or display some meaningful message if there is no such word

//split text both by line and by TAB to get the array
// create an array of vowels and an array of consonants to check against.

export {};
//declare function require(name: string): any;

// const readline = require('readline'); In case we truly aim for asking the ID on the spot and not predefined...

function rememberThePlate(id: string): string[] {
  const fs = require('fs');
  //validate the input (string of 2-5 characters, but no numbers in it)
  if (!(id.length <= 5 && id.length >= 2 && !id.match(/\d/g))) {
    console.log('Naah');
    return;
  } // !! Here I should make an extra care for basic english letters only!
  //store the ID in an array instead:
  const idArr: string[] = id.split('');
  //create the list of word array, by splitting the text both by line and by tab.
  const words: string[] = fs
    .readFileSync('fileDepo/words.txt', 'utf-8')
    .split('\r\n')
    .join('\t')
    .split('\t');
  let output: string[] = [];
  //create an array of vowels and an array of consonants
  const vowels: string[] = ['e', 'u', 'i', 'o', 'a', 'y'];
  const consonants: string[] = [
    'b',
    'c',
    'd',
    'f',
    'g',
    'h',
    'j',
    'k',
    'l',
    'm',
    'n',
    'p',
    'q',
    'r',
    's',
    't',
    'v',
    'w',
    'x',
    'z',
    'y',
  ];

  // describe basic facts about the ID, to make the search easier:
  const idTypes: string[] = idArr.map((letter) =>
    vowels.includes(letter) ? 'vowel' : 'consonant',
  );
  // if the licence plate starts with a vowel, the word also has to start with the same vowel
  if (idTypes[0] === 'vowel') {
    output = words.filter((word) => word.split('')[0] === idArr[0]);
    // after vowels if the next letter on the licence plate is a consonant then this consonant should come as next,
    // if the next letter on the licence plate is a vowel other consonants can come between them
    if (consonants.includes(idArr[1])) {
      output = output.filter((word) => word.split('')[1] === idArr[1]);
    } else {
      output = output.filter((word) => {
        let truth: boolean = false;
        let alreadyFound: boolean = false;
        word.split('').forEach((letter, index) => {
          if (index >= 1 && vowels.includes(letter)) {
            if (!alreadyFound) {
              truth = letter === idArr[1];
              alreadyFound = true;
            }
          }
        });
        return truth;
      });
    }
  }

  // if it starts with a consonant, it can start with any vowel but after the vowel(s) this consonant should come
  else if (idTypes[0] === 'consonant') {
    output = words.filter((word) => {
      let truth: boolean = false;
      let alreadyFound: boolean = false;
      word.split('').forEach((letter) => {
        if (consonants.includes(letter)) {
          if (!alreadyFound) {
            truth = letter === idArr[0];
            alreadyFound = true;
          }
        }
      });
      return truth;
    });
    // after consonants if the next letter on the licence plate is a consonant then any vowel(s) can come between them
    // but if the next character in the licence plate is a vowel then no other letter can come between them
    if (vowels.includes(idArr[1])) {
      output = output.filter((word) => word.split('')[1] === idArr[1]);
    } else {
      output = output.filter((word) => {
        let truth: boolean = false;
        let alreadyFound: boolean = false;
        word.split('').forEach((letter, index) => {
          if (index >= 1 && consonants.includes(letter)) {
            if (!alreadyFound) {
              truth = letter === idArr[1];
              alreadyFound = true;
            }
          }
        });
        return truth;
      });
    }
  }
  console.log(output);

  // const plate:{}={
  //   firstLetterIS: vowels.includes(idArr[0]) ? 'vowel' : 'consonant'
  // }
}

//rememberThePlate('usddr');
rememberThePlate('lmo');

//   try {
//     return fs
//       .readFileSync(ID, 'utf-8')
//       .split('\n')
//       .map((line) => {
//         return line.split('').reverse().join(``);
//       })
//       .join(`\n`);
//   } catch (error) {
//     return ['Sorry, no luck this time.'];
//     //console.log('Sorry, no luck this time.');
//   }
// }

// console.log(rememberThePlate('fileDepo/words.txt'));

// const plateID = 'agave';

// console.log(rememberThePlate(plateID));
