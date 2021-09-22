import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { User } from '../../users/entities/user.entity'

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  amountAvailable: number

  @Column()
  cost: number

  @ManyToOne(() => User, (user) => user.products, { onDelete: 'CASCADE' })
  seller: User
}
