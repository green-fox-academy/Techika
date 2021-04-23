//import fetch from 'node-fetch'; // only use while testing in node!

window.onload = function () {
  const clickMe = document.querySelector('.clickMe');
  const awaitMe = document.querySelector('.awaitMe');
  const failMe = document.querySelector('.failMe');

  const container = document.querySelector('.hijackMe');

  clickMe.addEventListener('click', newJoke);
  awaitMe.addEventListener('click', altJoke);
  failMe.addEventListener('click', badJoke);

  function newJoke() {
    fetch('http://api.icndb.com/jokes/random')
      .then((res) => res.json())
      .then((res) => (container.innerHTML += `<p>${res.value.joke}</p>`))
      .catch(() => (container.innerHTML += `<p>Error: I'm not in a funny mood today</p>`));
  }

  function badJoke() {
    fetch('wrong address')
      .then((res) => res.json())
      .then((res) => (container.innerHTML += `<p>${res.value.joke}</p>`))
      .catch(
        () =>
          (container.innerHTML += `<p style="color:red">Error: I'm not in a funny mood today!</p>`)
      );
  }

  async function altJoke() {
    try {
      const response = await fetch('http://api.icndb.com/jokes/random');
      const data = await response.json();
      container.innerHTML += `<p>${data.value.joke}</p>`;
    } catch (error) {
      container.innerHTML += `<p>Error: I'm not in a funny mood today</p>`;
    }
  }
};
