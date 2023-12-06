const request = require('supertest');
const app = require('../app');

let id;
let token;

test('POST /images', async () => {
    const body = {
        firstName: 'Pawer',
        lastName: "Devia",
        email: 'pawer@gmail.com',
        password: 'pawer1234',
        phone: '1234567890'
    }
    const res = await request(app).post('/images').send(body);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.firstName).toBe(body.firstName);
    expect(res.body.id).toBeDefined();
});

test('GET /images', async () => {
    const res = await request(app)
        .get('/images')
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('PUT /images/:id', async () => {
    const body = { firstName: 'Pawer updated' }
    const res = await request(app)
        .put(`/cart/${id}`)
        .send(body)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(body.firstName);
});
