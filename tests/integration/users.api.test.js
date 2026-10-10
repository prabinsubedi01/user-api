
import request from 'supertest';
import { beforeEach, describe, expect, it } from 'vitest';
import { createApp } from '../../src/app.js';
import { createContainer } from '../../src/container.js';

const USERS = '/api/v1/users';

const sita = {
  firstName: 'Sita',
  lastName: 'Gurung',
  email: 'sita@example.com',
  password: 'Secret123',
  address: {
    street: 'Lakeside Road 5',
    city: 'Pokhara',
    country: 'Nepal'
  }
};

describe('Users API (integration)', () => {
  let app;
  let container;

  beforeEach(() => {
    container = createContainer({
      hashPassword: async (plain) => `fake-hash:${plain}`
    });

    app = createApp(container);
  });

  it('creates a user and uses the injected hasher', async () => {
    const res = await request(app).post(USERS).send(sita);

    expect(res.status).toBe(201);
    expect(res.body.data).not.toHaveProperty('passwordHash');

    const stored = await container.usersRepository.findById(
      res.body.data.id
    );

    expect(stored.passwordHash).toBe('fake-hash:Secret123');
  });

  it('starts with an empty store for each test', async () => {
    const res = await request(app).get(USERS);

    expect(res.body.meta.total).toBe(0);
  });

  it('supports create, get, patch and delete', async () => {
    const created = await request(app).post(USERS).send(sita);

    expect(created.status).toBe(201);

    const url = `${USERS}/${created.body.data.id}`;

    expect((await request(app).get(url)).status).toBe(200);

    const updated = await request(app)
      .patch(url)
      .send({ phone: '+977-9811111111' });

    expect(updated.body.data.phone).toBe('+977-9811111111');

    expect((await request(app).delete(url)).status).toBe(204);
    expect((await request(app).get(url)).status).toBe(404);
  });

  it('rejects form-encoded POST with 415', async () => {
    const res = await request(app)
      .post(USERS)
      .type('form')
      .send('firstName=Sita');

    expect(res.status).toBe(415);
    expect(res.headers['content-type']).toMatch(
      /application\/problem\+json/
    );
  });

  it('rejects invalid IDs with 400', async () => {
    const res = await request(app).get(`${USERS}/123`);

    expect(res.status).toBe(400);
    expect(res.body.detail).toBe('id must be a valid UUID');
  });

  it('validates IDs for PATCH and DELETE too', async () => {
    const patch = await request(app)
      .patch(`${USERS}/abc`)
      .send({ phone: '+977-9811111111' });

    const remove = await request(app).delete(`${USERS}/abc`);

    expect(patch.status).toBe(400);
    expect(remove.status).toBe(400);
  });

  it('returns 404 for a valid but unknown UUID', async () => {
    const res = await request(app).get(
      `${USERS}/15cfde80-9253-4e58-a113-a87a9e67498a`
    );

    expect(res.status).toBe(404);
  });

  it('allows a fake service to replace the real service', async () => {
    const fakeService = {
      list: async () => ({
        data: [{ id: 'x', firstName: 'Fake' }],
        meta: {
          page: 1,
          limit: 20,
          total: 1,
          totalPages: 1
        }
      })
    };

    const fakeApp = createApp(
      createContainer({ usersService: fakeService })
    );

    const res = await request(fakeApp).get(USERS);

    expect(res.body.data).toEqual([
      { id: 'x', firstName: 'Fake' }
    ]);
  });
});
