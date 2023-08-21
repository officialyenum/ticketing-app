import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

it('returns a 404 if the provided id does not exist', async () => {
    const id:string = new mongoose.Types.ObjectId().toHexString();
    console.log(id);
    await request(app)
    .put(`/api/tickets/${id}`)
    .set('Cookie', testSignUp())
    .send({
        title: 'asldkf',
        price: 20
    }).expect(404);
})
it('returns a 401 if the user is not authenticated', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    const res = await request(app)
    .put(`/api/tickets/${id}`)
    .send({
        title: 'asldkf',
        price: 20
    }).expect(401);
    console.log(res.body);
    
})
it('returns a 401 if the user does not own the ticket', async () => {
    const response = await request(app)
    .post(`/api/tickets`)
    .set('Cookie', testSignUp())
    .send({
        title: 'asldkf',
        price: 20
    });

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', testSignUp())
        .send({
            title: 'asldkflskjdf',
            price: 20
        }).expect(400);
})
it('returns a 400 if the user provides invalid title or price', async () => {
    const cookie = testSignUp();
    const response = await request(app)
    .post(`/api/tickets`)
    .set('Cookie', cookie)
    .send({
        title: 'asldkf',
        price: 20
    });

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: '',
            price: 20
        }).expect(400);

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'asldkf',
            price: -10
        }).expect(400);
})

it('update the tickets provided valid inputs', async () => {
    const cookie = testSignUp();
    const response = await request(app)
    .post(`/api/tickets`)
    .set('Cookie', cookie)
    .send({
        title: 'asldkf',
        price: 20
    });

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'new title',
            price: 100
        }).expect(200);
    const ticketResponse = await request(app).get(`/api/tickets/${response.body.id}`).send();
    expect(ticketResponse.body.title).toEqual('new title');
    expect(ticketResponse.body.price).toEqual(100);
})