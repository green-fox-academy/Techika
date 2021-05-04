import { db } from './db.js';
import { listCreator } from './listcreator.js';

window.onload = () => {
  const dropGenre = document.getElementById('genre');
  const dropMovie = document.getElementById('movie');

  dropGenre.innerHTML = listCreator(db, 'genres');
  dropMovie.innerHTML = listCreator(db, 'movies');

  const form = {
    self: document.getElementById('movie-selector'),
    genre: document.getElementById('genre'),
    movie: document.getElementById('movie'),
    output: document.getElementById('output'),
  };
  form.genre.addEventListener('change', () => {
    const selection = form.genre.value;
    dropMovie.innerHTML = listCreator(db, 'movies', selection);
  });
  form.movie.addEventListener('change', () => {
    form.output.textContent = form.movie.value;
  });
};
