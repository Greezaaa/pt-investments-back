import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from "passport-jwt";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { PassportStrategy } from "@nestjs/passport";

import { User } from "../entities/user.entity";
import { JwtPayload } from "../dto/interfaces";
 
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) { 

    constructor (
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly configService: ConfigService
    ) {
        super({
            secretOrKey: configService.get('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        });
    }
    
    async validate(payload: JwtPayload): Promise<User> {
        const { id } = payload;
        const user = await this.userRepository.findOneBy({ id });
        if (!user)
            throw new UnauthorizedException('Invalid credentials (token)');
        if (!user.isActive) 
            throw new UnauthorizedException('User account was canceled, please contact the admin');
            
        return user;
    }
}
