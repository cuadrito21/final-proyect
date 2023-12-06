const request = require('supertest');
const app = require('../app');

let id;
let token;

test('POST /purchases', async () => {
    const body = {
        firstName: 'Pawer',
        lastName: "Devia",
        email: 'pawer@gmail.com',
        password: 'pawer1234',
        phone: '1234567890'
    }
    const res = await request(app).post('/purchases').send(body);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.firstName).toBe(body.firstName);
    expect(res.body.id).toBeDefined();
});

test('POST /purchases/login', async () => {
    const body = {
        email: 'pawer@gmail.com',
        password: 'pawer1234',
    }
    const res = await request(app)
        .post('/purchases/login')
        .send(body);
    token = res.body.token;
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
});

test('GET /purchases', async () => {
    const res = await request(app)
        .get('/purchases')
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('PUT /purchases/:id', async () => {
    const body = { firstName: 'Pawer updated' }
    const res = await request(app)
        .put(`/purchases/${id}`)
        .send(body)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(body.firstName);
});

test('POST /purchases/login debe retornar credenciales incorrectas', async () => {
    const body = {
        email: 'incorrecto@gmail.com',
        password: 'incorrecto1234'
    }
    const res = await request(app)
        .post('/purchases/login')
        .send(body);
    expect(res.status).toBe(401);
});