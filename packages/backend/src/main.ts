import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import * as helmet from 'helmet'
import { AppModule } from './app.module'

const { PORT = 8080 } = process.env

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true })

  app.use(helmet())

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  )

  await app.listen(PORT)
}
bootstrap()
