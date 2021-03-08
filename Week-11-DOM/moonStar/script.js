const starTemplate = document.querySelector('.star').cloneNode();

//--- Adding 10 extra stars at random locations (above ground)
for (let index = 0; index < 10; index++) {
  const randX = randBetween();
  const randY = randBetween();
  if (noStarsIn50px(randX, randY)) {
    const newClone = starTemplate.cloneNode();
    newClone.style.left = `${randX}%`;
    newClone.style.top = `${randY}%`;
    document.querySelector('.world').appendChild(newClone);
  } else {
    index -= 1;
  }
}

function randBetween(min = 1, max = 99) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
//--- Adding star on click location ----
document.querySelector('.world').addEventListener('click', addStarOnClick, true);
function addStarOnClick(e) {
  if (e.clientY < 800 && !e.target.classList.contains('moon')) {
    const newClone = starTemplate.cloneNode();
    if (noStarsIn50px(e.clientX, e.clientY)) {
      newClone.style.left = `${e.clientX}px`;
      newClone.style.top = `${e.clientY}px`;
      document.querySelector('.world').appendChild(newClone);
    }
  }
}

//---  proximity prevention
function noStarsIn50px(newX, newY) {
  const stars = document.querySelectorAll('.star:not(.fallen)');
  if (stars.length !== 0) {
    return Array.from(stars).every((star) => {
      const oldX = star.getBoundingClientRect().x;
      const oldY = star.getBoundingClientRect().y;
      const distance = Math.sqrt(Math.pow(newY - oldY, 2) + Math.pow(newX - oldX, 2));
      if (distance <= 50) {
        return false;
      }
      return true;
    });
  } else {
    return true;
  }
}

//--- Falling stars randomly 1by1 and removing them after fall animation
(function randomFall() {
  var rand = randBetween(500, 3000);
  setTimeout(function () {
    const fallen = document.querySelector('.star:is(.fallen)');
    if (fallen) {
      fallen.remove();
    }
    const stars = document.querySelectorAll('.star:not(.fallen)');
    if (stars.length !== 0) {
      const randomStar = stars[randBetween(0, stars.length - 1)];
      randomStar.classList.add('fallen');
      randomFall(); // if you need the process looping, move this line out of the if
    }
  }, rand);
})();

//--- Makingtrees grow on click
document.querySelectorAll('.tree').forEach((tree) => {
  tree.addEventListener('click', growNode, true);
});
function growNode(e) {
  e.currentTarget.appendChild(document.createElement('span'));
}
//--- Making Moon draggable
const moon = document.querySelector('.moon');
moon.onmousedown = function (event) {
  let shiftX = event.clientX - moon.getBoundingClientRect().left;
  let shiftY = event.clientY - moon.getBoundingClientRect().top;
  moon.style.position = 'absolute';
  moon.style.zIndex = 1000;
  moveAt(event.pageX, event.pageY);

  function moveAt(pageX, pageY) {
    moon.style.left = pageX - shiftX + 'px';
    moon.style.top = pageY - shiftY + 'px';
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  document.addEventListener('mousemove', onMouseMove);

  moon.onmouseup = function () {
    document.removeEventListener('mousemove', onMouseMove);
    moon.onmouseup = null;
  };
};

moon.ondragstart = function () {
  return false;
};
//----------------------------
