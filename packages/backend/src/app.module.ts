import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import * as Joi from 'joi'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { ProductsModule } from './products/products.module'
import { MachineModule } from './machine/machine.module'
import { appConfig } from './config/app.config'
import { databaseConfig, DatabaseConfigType } from './config/database.config'
import { jwtConfig } from './config/jwt.config'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig, databaseConfig, jwtConfig],
      validationSchema: Joi.object({
        APP_ENV: Joi.string().default('development'),
        APP_HOST: Joi.string().default('localhost'),
        APP_NAME: Joi.string().default('Vending Machine'),
        APP_PORT: Joi.string().default(3000),
        BCRYPT_SALT: Joi.number().default(10),
        DATABASE_HOST: Joi.string().default('localhost'),
        DATABASE_PORT: Joi.number().default(5432),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_USER: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
        ACCESS_TOKEN_SECRET: Joi.string().required(),
        ACCESS_TOKEN_EXPIRATION_TIME: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [databaseConfig.KEY],
      useFactory: (db: DatabaseConfigType) => ({
        type: db.driver as 'postgres',
        host: db.host,
        port: +db.port,
        database: db.name,
        username: db.username,
        password: db.password,
        autoLoadEntities: true,
        synchronize: true, // 👈  recommended: disable in the production
      }),
    }),
    AuthModule,
    UsersModule,
    ProductsModule,
    MachineModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
