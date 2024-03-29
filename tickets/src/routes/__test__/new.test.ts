import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";

it('has a route handler listening to /api/tickets for post requests', async () => {
    const response = await request(app).post('/api/tickets').send({});

    expect(response.status).not.toEqual(404);
})

it('can only be accessed if user is signed in', async () => {
    await request(app).post('/api/tickets').send({}).expect(401);
})

it('returns a status other than 401 if user is signed in', async () => {
    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', testSignUp())
        .send({});
    expect(response.status).not.toEqual(401);
})

it('returns an error if title is invalid', async () => {
    await request(app)
        .post('/api/tickets')
        .set('Cookie', testSignUp())
        .send({
            title: '',
            price: 10
        }).expect(400);

    await request(app)
        .post('/api/tickets')
        .set('Cookie', testSignUp())
        .send({
            price: 10
        }).expect(400);

})

it('returns an error if invalid price is provided', async () => {
    await request(app)
        .post('/api/tickets')
        .set('Cookie', testSignUp())
        .send({
            title: 'asdfjfk',
            price: -10
        }).expect(400);

    await request(app)
        .post('/api/tickets')
        .set('Cookie', testSignUp())
        .send({
            title: 'asdfjfk'
        }).expect(400);
})

it('creates a ticket with valid inputs', async () => {
    let tickets = await Ticket.find({});
    expect(tickets.length).toEqual(0);
    
    const title = 'test-title';
    await request(app)
    .post('/api/tickets')
    .set('Cookie', testSignUp())
    .send({
        title: title,
        price: 20
    }).expect(201);

    tickets = await Ticket.find({});
    expect(tickets.length).toEqual(1);
    expect(tickets[0].title).toEqual(title);
    expect(tickets[0].price).toEqual(20);
})
