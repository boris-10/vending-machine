import { Inject, Injectable } from '@nestjs/common'
import { hashSync, compare } from 'bcrypt'
import { ConfigType } from '@nestjs/config'
import { AppConfig } from '../app.config'

@Injectable()
export class PasswordService {
  constructor(@Inject(AppConfig.KEY) private readonly config: ConfigType<typeof AppConfig>) {}

  compare(password: string, encrypted: string): Promise<boolean> {
    return compare(password, encrypted)
  }

  hash(password: string): string {
    return hashSync(password, Number(this.config.bcryptSalt))
  }
}
