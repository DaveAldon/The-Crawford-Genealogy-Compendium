import geneology from './geneology.api';
import type { NextApiRequest, NextApiResponse } from 'next';
import { createRequest, createResponse } from 'node-mocks-http';

type ApiRequest = NextApiRequest & ReturnType<typeof createRequest>;
type ApiResponse = NextApiResponse & ReturnType<typeof createResponse>;

describe('geneology api requests', () => {
  test('empty request responds with status code 400', async () => {
    expect.assertions(1);
    const mockReq = createRequest<ApiRequest>();
    const mockRes = createResponse<ApiResponse>();
    geneology(mockReq, mockRes);
    expect(mockRes.statusCode).toBe(400);
  });
});
