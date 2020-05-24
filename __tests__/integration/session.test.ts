
import {
  createConnection,
  getConnection,
  getRepository,
  Connection
} from 'typeorm'

import connection from '../connection'
import { User } from '../../src/database/entity/User'

describe('Autentication', () => {
  beforeEach(() => {
    return createConnection(connection)
  })

  afterEach(() => {
    const conn: Connection = getConnection()
    return conn.close()
  })

  it('should save email', async () => {
    await getRepository(User).insert({
      name: 'Luan',
      email: 'luan@prestes',
      passwordHash: '123456'
    })

    const luan = await getRepository(User).find({
      where: {
        id: 1
      }
    })

    expect(luan[0].email).toBe('luan@prestes')
  })
})
