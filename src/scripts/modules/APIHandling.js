const postGame = async () => {
  const requestURL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api';
  const result = await fetch(`${requestURL}/games`, {
    method: 'POST',
    body: JSON.stringify({
      name: 'Game 1',
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json());
  return result;
};

export { postGame };