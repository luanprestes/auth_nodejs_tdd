import {
  createConnection,
  getConnection,
  getManager,
  Connection
} from 'typeorm'
import connection from '../connection'

import { User } from '../../src/database/entity/User'
import bcrypt from 'bcryptjs'

describe('User', () => {
  beforeEach(() => {
    return createConnection(connection)
  })

  afterEach(() => {
    const conn: Connection = getConnection()
    return conn.close()
  })

  it('should encrypt user password', async () => {
    const entityManager = getManager()

    const userData = new User()
    userData.name = 'luan'
    userData.email = 'luan@prestes'
    userData.password = '123456'
    await entityManager.save(userData)

    const user = await entityManager.findOne(User, 1)
    const compareHash = await bcrypt.compare('123456', user.passwordHash)

    expect(compareHash).toBe(true)
  })
})
