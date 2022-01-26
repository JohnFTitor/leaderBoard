import { postGame, postScore } from './APIHandling.js';

const createGame = async () => {
  const namedId = await postGame();
  const reGex = /(?<=Game with ID: ).+(?= )/gi;
  const id = namedId.result.match(reGex)[0];
  return id;
};

const createScore = async (id, score) => {
  const message = await postScore(id, score);
  const form = document.querySelector('form');
  const span = document.createElement('span');

  span.textContent = message.result;
  form.appendChild(span);
};

export { createGame, createScore };
