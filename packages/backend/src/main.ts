import { ValidationPipe } from '@nestjs/common'
import { ConfigService, ConfigType } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { appConfig } from './config/app.config'
import { APP_CONFIG } from './config/constants'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api/v1')

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    })
  )

  const configService = app.get<ConfigService>(ConfigService)
  const { port } = configService.get<ConfigType<typeof appConfig>>(APP_CONFIG)

  await app.listen(port)
}
bootstrap()
