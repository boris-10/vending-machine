import { Inject, Injectable } from '@nestjs/common'
import { hash, compare } from 'bcrypt'
import { ConfigType } from '@nestjs/config'
import { AppConfig } from '../app.config'

@Injectable()
export class PasswordService {
  constructor(@Inject(AppConfig.KEY) private readonly config: ConfigType<typeof AppConfig>) {}

  compare(password: string, encrypted: string): Promise<boolean> {
    return compare(password, encrypted)
  }

  hash(password: string): Promise<string> {
    return hash(password, Number(this.config.bcryptSalt))
  }
}
