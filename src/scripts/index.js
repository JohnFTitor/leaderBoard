import './styles/main.scss';
import { createGame, createScore } from './modules/leaderboard.js';

let id = '';
const form = document.querySelector('form');
const username = document.querySelector('#username');
const userscore = document.querySelector('#userscore');

function cleanSpan() {
  const span = form.querySelector('span');
  if (span) {
    form.removeChild(span);
  }
}

window.onload = async () => {
  if (!localStorage.getItem('idAPI')) {
    id = await createGame();
    localStorage.setItem('idAPI', id);
  } else {
    id = localStorage.getItem('idAPI');
  }
};

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const usernameValue = username.value.trim();
  const userscoreValue = userscore.value;

  if (usernameValue) {
    const score = {
      user: usernameValue,
      score: userscoreValue,
    };
    createScore(id, score);
  }
});

username.addEventListener('change', cleanSpan);
userscore.addEventListener('change', cleanSpan);