// vowel = maganhangzo
// consonant = mássalhangzó

//input: 2-5 string

// Checklist:
// ✓ validate the input
// ✓ parse and search through the terms in the file
// ✓ use exception handling for both validating the input and reading the file
// ✓ return a list of possible words or display some meaningful message if there is no such word

//split text both by line and by TAB to get the array
// create an array of vowels and an array of consonants to check against.

export {};

// const readline = require('readline'); In case we truly aim for asking the ID on the spot and not predefined...

function rememberThePlate(id: string): string[] {
  const fs = require('fs');
  //check if the dictionary fiel exists
  try {
    if (!fs.existsSync('fileDepo/words.txt')) throw 'error';
  } catch (error) {
    // console.log('Sorry, the dictionary file is not found, please create: fileDepo/words.txt');
    return;
  }
  console.log('Reminders found for plate ID: ' + id);

  //validate the input (string of 2-5 characters, but no numbers in it)
  if (!(id.length <= 5 && id.length >= 2 && !id.match(/\d/g))) {
    console.log(
      'Sorry, the PlateID needs to be 2-5 characters long, using only basic lowcap english alphabet letters'
    );
    return;
  } // !! Here I could make an extra care for basic english letters only!

  //store the ID in an array instead:
  const idArr: string[] = id.split('');

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

  // check the type of letters in the plate text and store for reference
  const idTypes: string[] = idArr.map((letter) =>
    vowels.includes(letter) ? 'vowel' : 'consonant'
  );

  //Create a text variable to store the regex expression and apply the criteria on the expression step by step.
  let regText: string = '';
  idTypes.forEach((type, poz) => {
    // determine first characters
    if (poz === 0) {
      // if the licence plate starts with a vowel, the word also has to start with the same vowel
      if (type === 'vowel') regText += idArr[0];
      // if it starts with a consonant, it can start with any vowel but after the vowel(s) this consonant should come
      if (type === 'consonant') regText += '[euioay]?' + idArr[0];

      //after vowels
    } else if (idTypes[poz - 1] === 'vowel') {
      // if the next letter on the licence plate is a consonant then this consonant should come as next
      if (type === 'consonant') regText += idArr[poz];
      // if the next letter on the licence plate is a vowel other consonants can come between them
      if (type === 'vowel') regText += '[bcdfghjklmnpqrstvwxzy]*' + idArr[poz];

      // after consonants
    } else if (idTypes[poz - 1] === 'consonant') {
      // if the next letter on the licence plate is a consonant then any vowel(s) can come between them
      if (type === 'consonant') regText += '[euioay]*' + idArr[poz];
      // if the next character in the licence plate is a vowel then no other letter can come between them
      if (type === 'vowel') regText += idArr[poz];
    }
  });
  // close regex pattern with "any"
  regText += '.*';
  // create regex search item from the text variable
  const search: RegExp = new RegExp('\\b' + regText + '\\b', 'g');
  // perform the search directly on the input file
  const matches: string[] = fs
    .readFileSync('fileDepo/words.txt', 'utf-8')
    .replace(/\t/g, '\r\n')
    .match(search);
  // log out the search pattern and the results
  console.log(search);
  if (matches === null) return ['No matching words!'];
  else return matches;
  //console.log(matches);
}

console.log(rememberThePlate('lmo'));
console.log(rememberThePlate('rdo'));
console.log(rememberThePlate('antl'));
console.log(rememberThePlate('rdhko'));
console.log(rememberThePlate('rdo2'));
