const starTemplate = document.querySelector('.star').cloneNode();

for (let index = 0; index < 10; index++) {
  const randW = randBetween();
  const randH = randBetween();
  const newClone = starTemplate.cloneNode();
  newClone.style.left = `${randW}%`;
  newClone.style.top = `${randH}%`;
  document.querySelector('.world').appendChild(newClone);
}

function randBetween(min = 1, max = 99) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

document.querySelector('.world').addEventListener('click', worldClicked, true);
function worldClicked(e) {
  if (e.clientY < 800) {
    const newClone = starTemplate.cloneNode();
    newClone.style.left = `${e.clientX}px`;
    newClone.style.top = `${e.clientY}px`;
    document.querySelector('.world').appendChild(newClone);
  }
}

(function randomFall() {
  console.log('started');
  var rand = randBetween(500, 3000);
  setTimeout(function () {
    const stars = document.querySelectorAll('.star:not(.fallen)');
    if (stars.length !== 0) {
      stars[randBetween(0, stars.length - 1)].classList.add('fallen');
      randomFall(); // if you need the process looping, move this line out of the if
    }
  }, rand);
})();

document.querySelectorAll('.tree').forEach((tree) => {
  tree.addEventListener('click', growNode, true);
});
function growNode(e) {
  e.currentTarget.appendChild(document.createElement('span'));
}
