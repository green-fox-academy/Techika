window.onload = () => {
  const form = {
    self: document.getElementById('cat-form'),
    favPet: {
      dog: document.getElementById('dog'),
      cat: document.getElementById('cat'),
      viktor: document.getElementById('viktor'),
    },
    catFacts: {
      yes: document.getElementById('yes'),
      no: document.getElementById('no'),
    },
    buttons: {
      lovecats: document.getElementById('lovecats'),
      signup: document.getElementById('signup'),
      all: document.querySelectorAll('button'),
    },
  };

  form.self.addEventListener('change', (e) => {
    if (document.querySelector('input[name="petter"]:checked')) {
      form.buttons.signup.disabled = false;
    }
    if (form.catFacts.yes.checked) {
      form.buttons.lovecats.disabled = false;
    } else if (form.catFacts.yes.checked === false) {
      form.buttons.lovecats.disabled = true;
    }
  });
  form.buttons.all.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      if (form.buttons.lovecats.disabled === true) {
        alert('Sigh, we still added you to the cat facts list');
      } else {
        alert("Thank you, you've successfully signed up for cat facts");
      }
    });
  });
};
