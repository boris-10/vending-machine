import { Injectable } from '@nestjs/common'
import { hash, compare } from 'bcrypt'

import { AppConfig, AppConfigType } from '../config/app.config'

@Injectable()
export class PasswordService {
  constructor(@AppConfig() private readonly appConfig: AppConfigType) {}

  compare(password: string, encrypted: string): Promise<boolean> {
    return compare(password, encrypted)
  }

  hash(password: string): string {
    return hash(password, +this.appConfig.bcrpytSalt)
  }
}
