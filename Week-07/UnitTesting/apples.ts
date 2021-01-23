class AppleType {
  getApple() {
    return 'Apple';
  }
}

import test = require('tape');

test('AppleTester', (t) => {
  const a: AppleType = new AppleType();
  t.equal(a.getApple(), 'Apple');
  t.end();
});
