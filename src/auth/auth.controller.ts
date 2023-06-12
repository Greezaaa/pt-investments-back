import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Headers,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IncomingHttpHeaders } from 'http';

import { RawHeaders, GetUser, RoleProtected, Auth } from './decorators';
import { AuthService } from './auth.service';

import { CreateUserDto, LoginUserDto } from './dto';
import { User } from './entities/user.entity';
import { UserRoleGuard } from './guards/user-role.guard';
import { ValidRoles } from './dto/interfaces';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }
  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('private')
  @UseGuards(AuthGuard())
  privetRoute(
    @GetUser() user: User,
    @RawHeaders() rawHeaders: string[],
    @Headers() headers: IncomingHttpHeaders,
  ) {
    return {
      ok: true,
      user,
      rawHeaders: [rawHeaders],
      headers: [headers],
    };
  }

  @Get('private2')
  @RoleProtected(ValidRoles.admin, ValidRoles.superUser)
  @UseGuards(AuthGuard(), UserRoleGuard)
  privateRoute2(@GetUser() user: User) {
    return {
      ok: true,
      user,
    };
  }

  @Get('private3')
  @Auth(
    ValidRoles.admin,
    // ValidRoles.superUser
  )
  privateRoute3() {
    return {
      ok: true,
      msg: 'private3',
    };
  }
  @Get('seed-users')
  seedUsers() {
    this.authService.seedUsers();
    return 'Seeding users...';
  }
  @Get('delete-users')
  deleteAll() {
    this.authService.deleteAllUsers();
    return 'Seeding users...';
  }
  @Get('admin')
  makeAdmin() {
    this.authService.makeAdmin();
    return 'Seeding users...';
  }
}
