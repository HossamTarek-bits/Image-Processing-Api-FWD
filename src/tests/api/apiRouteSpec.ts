// eslint-disable-next-line import/no-extraneous-dependencies
import request from 'supertest';
import app from '../../app';

describe('Api Route Suite', (): void => {
    describe('GET /api Specs', (): void => {
        it('should return status code 200', (): void => {
            request(app).get('/api').expect(200);
        });
    });
});
