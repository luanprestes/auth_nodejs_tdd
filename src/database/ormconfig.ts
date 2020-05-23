import 'dotenv/config'

import { ConnectionOptions } from 'typeorm'

const config: ConnectionOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  migrationsRun: true,
  logging: true,
  synchronize: false,
  entities: ['src/database/entity/*.ts'],
  migrations: ['src/database/migrations/*.ts'],
  cli: {
    entitiesDir: 'src/database/entity',
    migrationsDir: 'src/database/migrations'
  }
}

export = config
