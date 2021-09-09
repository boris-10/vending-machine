import { SetMetadata } from '@nestjs/common'
import { ROLES_METADATA_KEY } from './auth.constants'

export const Roles = (...roles: ('buyer' | 'seller')[]) => SetMetadata(ROLES_METADATA_KEY, roles)
