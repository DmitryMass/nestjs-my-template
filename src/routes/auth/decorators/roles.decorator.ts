import { UserRole } from 'types/roles';

import { SetMetadata } from '@nestjs/common';

export const ROLE_KEY = 'role';

export const Roles = (roles: string[]) => SetMetadata('role', roles);
