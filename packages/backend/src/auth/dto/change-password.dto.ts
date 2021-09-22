import { IsString, MinLength } from 'class-validator'

import { IsEqualTo } from '../../common/decorators/is-equal-to.decorator'

export class ChangePasswordDto {
  @IsString()
  @MinLength(8)
  newPassword: string

  @IsString()
  @MinLength(8)
  @IsEqualTo<ChangePasswordDto>('newPassword', {
    message: 'New password does not match confirm password',
  })
  confirmPassword: string
}
