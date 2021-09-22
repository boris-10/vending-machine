import { Exclude } from 'class-transformer'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { UserRole } from '../user-role'
import { Product } from '../../products/entities/product.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    unique: true,
  })
  username: string

  @Exclude({ toPlainOnly: true })
  @Column()
  password: string

  @Column('enum', { enum: UserRole, default: UserRole.Buyer })
  role?: string

  @Column('int', { default: 0 })
  deposit?: number

  @OneToMany(() => Product, (product) => product.seller, { cascade: true })
  products: Product[]
}
