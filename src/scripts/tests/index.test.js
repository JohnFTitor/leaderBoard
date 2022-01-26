import { createGame } from '../modules/leaderboard';

jest.mock('../modules/APIHandling');

describe('LeaderBoard Methods', () => {
  test('Create Game', async () => {
    const id = await createGame();

    expect(id).toEqual('Zl4d7IVkemOTTVg2fUdz');
  });
});