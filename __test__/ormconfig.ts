import 'dotenv/config'

import { ConnectionOptions } from 'typeorm'

const config: ConnectionOptions = {
  type: 'sqlite',
  database: '__test__/data/app.db',
  entities: ['src/database/entity/*.ts'],
  migrations: ['src/database/migrations/*.ts'],
  migrationsRun: true,
  logging: true,
  cli: {
    entitiesDir: 'src/database/entity',
    migrationsDir: 'src/database/migrations'
  }
}

export = config
