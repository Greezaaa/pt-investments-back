import { IsString } from 'class-validator';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @IsString()
    email:string

    @IsString()
    password: string
    
    @IsString()
    fullName: string
    

    isActive: boolean

    role: string[]
}

