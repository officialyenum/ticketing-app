import request from 'supertest';
import { app } from '../../app';

it('clears the cookie after signing out', async () => {
    const cookie = await testSignUp();
    const response = await request(app)
        .get('/api/users/currentUser')
        .set('Cookie', cookie)
        .send({})
        .expect(200);
    expect(response.body.currentUser.email).toEqual('test@test.com');

})

it('responds with null if not authenticated', async () => {
    const response = await request(app)
        .get('/api/users/currentUser')
        .send({})
        .expect(200);  
    expect(response.body.currentUser).toEqual(null);

})