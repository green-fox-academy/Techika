function anagram(s1: string, s2: string): Boolean {
  const a: string = s1.toLowerCase().split('').sort().join();
  const b: string = s2.toLowerCase().split('').sort().join();
  return a === b;
}

import test = require('tape');
test('test anagram', (t) => {
  t.equal(anagram('abcd', 'badc'), true);
  t.equal(anagram('Abcd', 'Badc'), true);
  t.equal(anagram('ab#cd', '#badc'), true);
  t.equal(anagram('', ''), true);
  t.equal(anagram('abcde', 'gbadc'), false);

  t.end();
});
