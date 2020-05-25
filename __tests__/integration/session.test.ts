
import {
  createConnection,
  getConnection,
  getManager,
  Connection
} from 'typeorm'
import supertest from 'supertest'

import connection from '../connection'
import { User } from '../../src/database/entity/User'
import app from '../../src/app'

describe('Autentication', () => {
  beforeEach(() => {
    return createConnection(connection).then(async () => {
      const userData = new User()
      userData.name = 'luan'
      userData.email = 'luan@prestes'
      userData.password = '123456'
      await getManager().save(userData)
    })
  })

  afterEach(() => {
    const conn: Connection = getConnection()
    return conn.close()
  })

  it('should authenticate with valid credentials', async () => {
    const user = await getManager().findOne(User, 1)
    const response = await supertest(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123456'
      })

    expect(response.status).toBe(200)
  })

  it('should not authenticate with invalid credentials', async () => {
    const user = await getManager().findOne(User, 1)
    const response = await supertest(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123123'
      })

    expect(response.status).toBe(401)
  })

  it('should return jwt token when authentication', async () => {
    const user = await getManager().findOne(User, 1)
    const response = await supertest(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123456'
      })

    expect(response.body).toHaveProperty('token')
  })

  it('should be able to access routes when authenticated', async () => {
    const user = await getManager().findOne(User, 1)
    const response = await supertest(app)
      .get('/dashboard')
      .set('authorization', `Bearer ${user.generateToken()}`)

    expect(response.status).toBe(200)
  })

  it('should not be able to access routes whitout jwt token', async () => {
    const response = await supertest(app)
      .get('/dashboard')

    expect(response.status).toBe(401)
  })

  it('should not be able to access routes whitout jwt token', async () => {
    const response = await supertest(app)
      .get('/dashboard')
      .set('authorization', 'Bearer 123123')

    expect(response.status).toBe(401)
  })
})
