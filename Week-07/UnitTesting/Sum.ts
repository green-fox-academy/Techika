class Maths {
  sum(integerList: number[]) {
    return integerList.reduce((previous, current) => previous + current, 0);
  }
}

import test = require('tape');
test('test addition', (t) => {
  const m: Maths = new Maths();
  t.equal(m.sum([1, 2, 3, 4]), 10);
  t.equal(m.sum([1, 1.5, -3, 4]), 3.5);
  t.equal(m.sum([3]), 3);
  t.equal(m.sum([]), 0);

  t.end();
});
