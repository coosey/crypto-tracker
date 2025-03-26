/**
 * @jest-environment node
 */
import { createMocks } from 'node-mocks-http';
import handler from '../coins-list.page';
import dotenv from 'dotenv';

dotenv.config();

describe('coins-list API', () => {
  test('GET request with API key in headers', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      headers: {
        'x-api-key': process.env.COINGECKO_KEY,
      },
    });

    await handler(req, res);

    const data = JSON.parse(JSON.stringify(res));

    expect(data.statusCode).toBe(200);
  });
});
