import 'dotenv/config'

import { ConnectionOptions } from 'typeorm'
import { User } from '../src/database/entity/User'

const config: ConnectionOptions = {
  type: 'sqlite',
  database: ':memory:',
  dropSchema: true,
  entities: [User],
  synchronize: true,
  logging: false
}

export default config
