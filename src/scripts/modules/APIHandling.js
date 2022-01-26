const postGame = async () => {
  const requestURL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api';
  const result = await fetch(`${requestURL}/games`, {
    method: 'POST',
    body: JSON.stringify({
      name: 'John Francis Titor Leader Board',
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json());
  return result;
};

const postScore = async (id, score) => {
  const requestURL = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${id}/scores`;
  const result = await fetch(requestURL, {
    method: 'POST',
    body: JSON.stringify(score),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json());
  return result;
};

const getScore = async (id) => {
  const requestURL = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${id}/scores`;
  const result = await fetch(requestURL).then((response) => response.json());
  return result;
};

export { postGame, postScore, getScore };