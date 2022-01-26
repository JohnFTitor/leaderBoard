import { createGame, createScore } from '../modules/leaderboard.js';

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
});