import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    private readonly users: User[] = [
        {
            id: 1,
            name: 'John Doe',
            email: 'jhon@gmail.com',
            password: '123456'
        },
        {
            id: 2,
            name: 'Michel Jackson',
            email: 'Jackson@gmail.com',
            password: '123456'
        },
        {
            id: 3,
            name: 'Felix Peterson',
            email: 'Peterson@gmail.com',
            password: '123456'
        }
    ]

    

}
