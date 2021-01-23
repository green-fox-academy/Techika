class Fia {
  neme = 'fiu';
}
class Apa {
  kora = 30;
  fia = new Fia();
  lanya = new (class {
    neme = 'lany';
  })();
}

const apa = new Apa();
console.log(apa.fia);
console.log(apa.lanya);
