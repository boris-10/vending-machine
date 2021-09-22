import { SetMetadata } from '@nestjs/common'

import { ROLES_METADATA_KEY } from '../auth.constants'
import { UserRole } from '../../users/user-role'

export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_METADATA_KEY, roles)
