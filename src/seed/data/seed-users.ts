import { CreateUserDto } from 'src/auth/dto';

export const usersToCreate: CreateUserDto[] = [
  {
    email: 'user1@example.com',
    password: 'Password1',
    firstName: 'John',
    lastName: 'Doe',
  },
  {
    email: 'user2@example.com',
    password: 'Password2',
    firstName: 'Jane',
    lastName: 'Smith',
  },
  {
    email: 'user3@example.com',
    password: 'Password3',
    firstName: 'Robert',
    lastName: 'Johnson',
  },
];
