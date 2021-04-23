window.onload = () => {
  const initialDivCount = Math.floor(Math.random() * 21 + 10);
  const container = document.querySelector('#container');

  addDivs(initialDivCount);

  let totalPageHeight = document.body.scrollHeight;
  let scrollPoint = window.scrollY + window.innerHeight;
  window.onscroll = function () {
    totalPageHeight = document.body.scrollHeight;
    scrollPoint = window.scrollY + window.innerHeight;
    if (scrollPoint >= totalPageHeight) {
      addDivs(10);
    }
  };

  function addDivs(amount) {
    for (let i = 0; i <= amount; i++) {
      container.innerHTML += `
        <div class="randiv" style="background-color:${randomColor()}">
        </div>
      `;
      console.log(container.innerHTML);
    }
  }

  function randomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
};
