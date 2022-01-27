import './styles/main.scss';
import { createGame, createScore, refreshScores } from './modules/leaderboard.js';

let id = '';
const form = document.querySelector('form');
const username = document.querySelector('#username');
const userscore = document.querySelector('#userscore');
const refreshButton = document.querySelector('#refreshButton');

const cleanSpan = () => {
  const span = form.querySelector('span');
  if (span) {
    form.removeChild(span);
  }
};

const displayLeaders = async () => {
  const leaderboard = document.querySelector('ul');
  const nodes = await refreshScores(id);
  if (nodes.length !== 0) {
    leaderboard.innerHTML = '';
    nodes.forEach((node) => {
      leaderboard.appendChild(node);
    });
  }
};

window.onload = async () => {
  if (!localStorage.getItem('idAPI')) {
    id = await createGame();
    localStorage.setItem('idAPI', id);
  } else {
    id = localStorage.getItem('idAPI');
    displayLeaders();
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
    username.value = '';
    userscore.value = '';
  }
});

username.addEventListener('click', cleanSpan);
userscore.addEventListener('click', cleanSpan);

refreshButton.addEventListener('click', displayLeaders);