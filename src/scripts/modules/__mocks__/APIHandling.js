const postGame = async () => Promise.resolve({ result: 'Game with ID: Zl4d7IVkemOTTVg2fUdz added.' });
const postScore = async () => Promise.resolve({ result: 'Leaderboard score created correctly.' });
const getScore = async () => Promise.resolve({
  result: [
    {
      user: 'John Doe',
      score: 45,
    },
    {
      user: 'Elizabeth',
      score: 90,
    },
    {
      user: 'Peter Parker',
      score: 120,
    },
  ],
});

export { postGame, postScore, getScore };