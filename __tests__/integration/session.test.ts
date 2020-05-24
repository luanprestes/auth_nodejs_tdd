
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
    return createConnection(connection)
  })

  afterEach(() => {
    const conn: Connection = getConnection()
    return conn.close()
  })

  it('should authenticate with valid credentials', async () => {
    const entityManager = getManager()
    const userData = new User()
    userData.name = 'luan'
    userData.email = 'luan@prestes'
    userData.password = '123456'
    await entityManager.save(userData)
    const user = await entityManager.findOne(User, 1)

    const response = await supertest(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123456'
      })

    expect(response.status).toBe(200)
  })

  it('should not authenticate with invalid credentials', async () => {
    const entityManager = getManager()
    const userData = new User()
    userData.name = 'luan'
    userData.email = 'luan@prestes'
    userData.password = '123456'
    await entityManager.save(userData)
    const user = await entityManager.findOne(User, 1)

    const response = await supertest(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123123'
      })

    expect(response.status).toBe(401)
  })
})
