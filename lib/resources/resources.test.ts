import { getResource } from './resources';
import { ResourceTypes } from './resources.enum';
import fetch, { Response } from 'node-fetch';

jest.mock('node-fetch', () => jest.fn());

describe('getResource', () => {
  const mockFetch = fetch as jest.MockedFunction<typeof fetch>;
  test('should return a response', async () => {
    const json = jest.fn() as jest.MockedFunction<any>;
    json.mockResolvedValue({ status: 200 });
    mockFetch.mockResolvedValue({ ok: true, json } as Response);
    const response = await getResource(
      'b14745c4-3d98-4bc3-a4d0-7e973c8a88ac',
      ResourceTypes.profile,
    );
    expect(response).toEqual({ status: 200 });
  });
});
