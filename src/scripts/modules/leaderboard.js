import { postGame, postScore, getScore } from './APIHandling.js';

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

const refreshScores = async (id) => {
  const data = await getScore(id);
  const nodes = [];
  data.result.forEach((leader) => {
    const leaderCard = document.createElement('li');
    leaderCard.textContent = `${leader.user}: ${leader.score}`;
    nodes.push(leaderCard);
  });
  return nodes;
};

export { createGame, createScore, refreshScores };
