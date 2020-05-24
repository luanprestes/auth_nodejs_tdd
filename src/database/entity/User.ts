import 'reflect-metadata'
import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm'
import bcrypt from 'bcryptjs'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({
    name: 'password_hash'
  })
  passwordHash: string;

  password: string;

  @Column({
    type: 'datetime',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP'
  })
  createdAt: Date;

  @Column({
    type: 'datetime',
    name: 'updated_at',
    onUpdate: 'CURRENT_TIMESTAMP',
    default: () => 'CURRENT_TIMESTAMP'
  })
  updatedAt: Date;

  @BeforeInsert()
  async encryptPassword (): Promise<void> {
    this.passwordHash = await bcrypt.hash(this.password, 8)
  }

  async checkPassword (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.passwordHash)
  }
}
