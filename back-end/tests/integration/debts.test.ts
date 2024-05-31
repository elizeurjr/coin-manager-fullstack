import { faker } from '@faker-js/faker';
import * as jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import supertest from 'supertest';
import { cleanDb, generateValidToken } from '../helpers';
import { createUser, createDebt } from '../factories';
import app, { init, close } from '@/app';

beforeAll(async () => {
  await init();
  await cleanDb();
});

beforeEach(async () => {
  await cleanDb();
});

afterAll(async () => {
  await close();
});

const server = supertest(app);

describe('GET /debts', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.get('/debts');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();

    const response = await server.get('/debts').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.get('/debts').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {
    it('should respond with status 200 and return historic', async () => {
      const user = await createUser();
      const user2 = await createUser();
      const token = await generateValidToken(user);
      const token2 = await generateValidToken(user2);
      let debt;
      let debt2;

      for (let i = 0; i < 10; i++) {
        debt = await createDebt(user);
        await server.post('/debts/store').set('Authorization', `Bearer ${token}`).send(debt);
      }

      for (let i = 0; i < 10; i++) {
        debt2 = await createDebt(user2);
        await server.post('/debts/store').set('Authorization', `Bearer ${token2}`).send(debt2);
      }

      const response = await server.get('/debts').set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            userId: debt.userId,
            creditor: expect.any(String),
            description: expect.any(String),
            amount: expect.any(Number),
            paid: expect.any(Boolean),
            createdAt: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/),
            payDate: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/),
          }),
        ]),
      );
    });
  });
});

describe('GET /debts/:debtId', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.get('/debts/:1');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();

    const response = await server.get('/debts/:1').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.get('/debts/:1').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {
    it('should respond with status 200 and return debt', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const debt = await createDebt(user);

      const response = await server.get(`/debts/${debt.id}`).set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual({
        id: debt.id,
        userId: debt.userId,
        creditor: debt.creditor,
        description: debt.description,
        amount: debt.amount,
        paid: expect.any(Boolean),
        createdAt: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/),
        payDate: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/),
      });
    });
  });
});

describe('POST /debts/store', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.post('/debts/store');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();

    const response = await server.post('/debts/store').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.post('/debts/store').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {
    it('should respond with status 400 if amount is invalid', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const debt = await createDebt(user);
      debt.amount = undefined;
      const body = debt;
      const response = await server.post('/debts/store').set('Authorization', `Bearer ${token}`).send(body);
      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it('should respond with status 400 if amount is invalid', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const debt = await createDebt(user);
      debt.payDate = faker.date.past();
      const body = debt;
      const response = await server.post('/debts/store').set('Authorization', `Bearer ${token}`).send(body);
      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it('should respond with status 400 if creditor is invalid', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const debt = await createDebt(user);
      debt.creditor = '';
      const body = debt;
      const response = await server.post('/debts/store').set('Authorization', `Bearer ${token}`).send(body);
      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it('should respond with status 201 and create debt', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const debt = await createDebt(user);
      const body = debt;
      const response = await server.post('/debts/store').set('Authorization', `Bearer ${token}`).send(body);

      expect(response.status).toBe(httpStatus.CREATED);
      expect(response.body).toEqual({
        id: expect.any(Number),
        userId: debt.userId,
        creditor: debt.creditor,
        description: debt.description,
        amount: debt.amount,
        paid: expect.any(Boolean),
        createdAt: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/),
        payDate: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/),
      });
    });
  });
});

describe('DELETE /debts/delete/:debtId', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.delete('/debts/delete/:1');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();

    const response = await server.delete('/debts/delete/:1').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.delete('/debts/delete/:1').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {
    it('should respond with status 200 and delete debt', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const debt = await createDebt(user);
      const body = debt;
      const debtStored = await server.post('/debts/store').set('Authorization', `Bearer ${token}`).send(body);
      const response = await server.delete(`/debts/delete/${body.id}`).set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual({
        id: expect.any(Number),
        userId: debt.userId,
        creditor: debt.creditor,
        description: debt.description,
        amount: debt.amount,
        paid: expect.any(Boolean),
        createdAt: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/),
        payDate: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/),
      });
    });
  });
});

describe('POST /debts/payment', () => {
  it('should respond with status 401 if no token is given', async () => {
    const paymentBody = {
      userId: 1,
      debtId: 1,
      payment: 11,
    };
    const response = await server.post('/debts/payment').send(paymentBody);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();
    const paymentBody = {
      userId: 1,
      debtId: 1,
      payment: 11,
    };
    const response = await server.post('/debts/payment').set('Authorization', `Bearer ${token}`).send(paymentBody);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);
    const paymentBody = {
      userId: userWithoutSession.id,
      debtId: 1,
      payment: 11,
    };

    const response = await server.post('/debts/payment').set('Authorization', `Bearer ${token}`).send(paymentBody);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {
    describe('when debt is not found', () => {
      it('should respond with status 404', async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
        const paymentBody = {
          userId: user.id,
          debtId: 1,
          payment: 11,
        };
        const response = await server.post('/debts/payment').set('Authorization', `Bearer ${token}`).send(paymentBody);

        expect(response.status).toBe(httpStatus.NOT_FOUND);
      });
    });
    //POST "/debts/payment/:debtId" Body: { userId, debtId, payment }
    //Response:
    //{ Debt:{{ id, userId, creditor, description, amount, paid, createdAt, payDate }}
    //Transactio:{ { id, userId, description, amount, entity, createdAt }}}
    describe('when amount is not enough to pay', () => {
      it('should update the owned amount, register the transaction and respond with status 200', async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
        const debt = await createDebt(user);
        const debtStored = await server.post('/debts/store').set('Authorization', `Bearer ${token}`).send(debt);
        const paymentBody = {
          userId: user.id,
          debtId: debt.id,
          payment: debt.amount - 1,
        };
        const response = await server.post(`/debts/payment/`).set('Authorization', `Bearer ${token}`).send(paymentBody);

        expect(response.status).toBe(httpStatus.OK);
        const debtId = expect.any(Number);
        expect(response.body).toEqual({
          Debt: {
            id: debtId,
            userId: debt.userId,
            creditor: debt.creditor,
            description: debt.description,
            amount: debt.amount,
            paid: expect(false),
            createdAt: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/),
            payDate: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/),
          },
          Transaction: {
            id: expect.any(Number),
            userId: user.id,
            description: `Payment of debt ${debtId}`,
            amount: debt.amount - paymentBody.payment,
            entity: debt.creditor,
            createdAt: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/),
          },
        });
      });
    });
    describe('when amount is enough to pay', () => {
      it('should update the owned amount, register the transaction and respond with status 200', async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
        const debt = await createDebt(user);
        const debtStored = await server.post('/debts/store').set('Authorization', `Bearer ${token}`).send(debt);
        const paymentBody = {
          userId: user.id,
          debtId: debt.id,
          payment: debt.amount,
        };
        const response = await server.post(`/debts/payment/`).set('Authorization', `Bearer ${token}`).send(paymentBody);

        expect(response.status).toBe(httpStatus.OK);
        const debtId = expect.any(Number);
        expect(response.body).toEqual({
          Debt: {
            id: debtId,
            userId: debt.userId,
            creditor: debt.creditor,
            description: debt.description,
            amount: debt.amount,
            paid: expect(true),
            createdAt: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/),
            payDate: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/),
          },
          Transaction: {
            id: expect.any(Number),
            userId: user.id,
            description: `Payment of debt ${debtId}`,
            amount: debt.amount - paymentBody.payment,
            entity: debt.creditor,
            createdAt: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/),
          },
        });
      });
    });
  });
});
