/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { JwtPayload, ValidRoles } from './dto/interfaces';
import { LoginUserDto, CreateUserDto } from './dto';
import { User } from './entities/user.entity';
import { usersToCreate } from '../seed/data/seed-users';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) { }

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find();
    users.forEach((user) => {
      delete user.password;
      delete user.isActive;
    });
    return users;
  }

  async create(createUserDto: CreateUserDto) {
    const { password, ...userData } = createUserDto;
    try {
      const user = this.userRepository.create({
        ...userData,
        password: await bcrypt.hash(password, 10),
      });
      await this.userRepository.save(user);
      delete user.password;
      delete user.isActive;
      return {
        ...user,
        // token: this.getJwtToken({ email })
        token: this.getJwtToken({ id: user.id }),
      };
      //TODO: send JWT token
    } catch (error) {
      this.handleDBError(error);
    }
  }

  async deleteAllUsers() {
    await this.userRepository.delete({});
    return true;
  }

  async seedUsers() {
    await this.loadUsersSeed();
    return true;
  }
  private async loadUsersSeed() {
    await this.deleteAllUsers();
    const users = usersToCreate;
    const insertPromises = [];

    users.forEach((user) => {
      insertPromises.push(this.create(user));
    });

    await Promise.all(insertPromises); // Wait for all user inserts to complete
    await this.makeAdmin(); // Call makeAdmin after all users have been inserted
    console.log('Users seeded successfully.');
  }

  async makeAdmin() {
    const adminUser = await this.userRepository.findOneBy({
      email: 'user1@example.com',
    });
    if (adminUser) {
      adminUser.role = [ValidRoles.admin];
      await this.userRepository.save(adminUser);
      console.log('Admin role added to the user with email: user1@example.com');
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { password, email } = loginUserDto;
    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true, id: true },
    });
    if (!user) throw new UnauthorizedException('Invalid credentials (email)');
    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Invalid credentials (password)');
    //TODO: send JWT token
    return {
      ...user,
      // token: this.getJwtToken({ email })
      token: this.getJwtToken({ id: user.id }),
    };
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  private handleDBError(error: any): never {
    if (error.code === '23505') {
      throw new BadRequestException('This user already exist');
    }
    console.log(error);
    throw new InternalServerErrorException(
      'Something went wrong, pls contact the admin to check the logs',
    );
  }
}
