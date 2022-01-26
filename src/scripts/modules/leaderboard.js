import { postGame } from './APIHandling';

const createGame = async () => {
  const namedId = await postGame();
  const reGex = /(?<=Game with ID: ).+(?= )/gi;
  const id = namedId.result.match(reGex)[0];
  return id;
};

export { createGame };
