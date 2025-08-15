import request from 'supertest';
import APP from '../app';
import prisma from '../utils/prisma';

describe('API de usuarios - Pruebas de Integración', () => {
  // Primero limpiamos la BBDD
  beforeAll(async () => {
    await prisma.post.deleteMany({});
    await prisma.user.deleteMany({});
  });

  // Cerramos la conexion con la BBDD
  afterAll(async () => {
    await prisma.$disconnect();
  });
  describe('POST /api/users', () => {
    it('debería crear un nuevo usuario y devolver un 201', async () => {
      const newUser = { name: 'Test User', email: 'test@example.com' };
      const response = await request(APP)
        .post('/api/users')
        .send(newUser)
        .expect(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe(newUser.name);
    });

    it('debería devolver un 400 si el email falta', async () => {
      await request(APP)
        .post('/api/users')
        .send({ name: 'Missing Email' })
        .expect(400);
    });

    it('debería devolver 4xx, email incorrecto', async () => {
      const newUser = { name: 'Test mail fail', email: 'test4example.com' };
      const response = await request(APP)
        .post('/api/users')
        .send(newUser)
        .expect(400);
    });
  });

  describe('GET /api/users', () => {
    it('debería devolver una lista de usuarios y un 200', async () => {
      const response = await request(APP).get('/api/users').expect(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });
});