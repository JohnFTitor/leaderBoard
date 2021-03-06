import { createGame, createScore, refreshScores } from '../modules/leaderboard.js';

jest.mock('../modules/APIHandling');

describe('LeaderBoard Methods', () => {
  test('Create Game', async () => {
    const id = await createGame();

    expect(id).toEqual('Zl4d7IVkemOTTVg2fUdz');
  });
  test('Create Score', async () => {
    document.body.innerHTML = '<form></form>';

    await createScore('', '');

    const score = document.querySelector('span');
    expect(score.textContent).toEqual('Leaderboard score created correctly.');
  });
  test('Refresh Scores', async () => {
    const nodes = await refreshScores('');

    const second = nodes[1];

    expect(second.textContent).toEqual('Elizabeth: 90');
  });
});