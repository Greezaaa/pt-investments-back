import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { User } from 'src/auth/entities/user.entity';
import { META_ROLES } from '../decorators/role-protected.decorator';
import { ValidRoles } from '../dto/interfaces';

@Injectable()
export class UserRoleGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector
  ) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const validRoles: string[] = this.reflector.get<string[]>(META_ROLES, context.getHandler());

    const request = context.switchToHttp().getRequest();
    const user = request.user as User;

    if(!user) 
    throw new BadRequestException('user not found(request)');
    
   for (const role of user.role) {
      if (validRoles.includes(role)) return true;
   } 
   throw new ForbiddenException(`User ${user.firstName} does not have permission to access. Need [${ValidRoles.admin}, ${ValidRoles.superUser} or ${ValidRoles.prime}] to access this route`);
  }
}
