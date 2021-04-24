window.onload = () => {
  const eye = document.querySelector('.far');
  function togglePw() {
    const pwInput = document.getElementById('password');
    if (pwInput.type === 'password') {
      pwInput.type = 'text';
      eye.classList.replace('fa-eye-slash', 'fa-eye');
    } else {
      pwInput.type = 'password';
      eye.classList.replace('fa-eye', 'fa-eye-slash');
    }
  }

  eye.addEventListener('click', togglePw);
};
