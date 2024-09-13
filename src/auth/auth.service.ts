import { Repository } from 'typeorm';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { RequestUser } from './interfaces/request-user.interface';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@/domain/users/entities/user.entity';
import { Hash } from '@/common/utils/hash';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async validateLocal(email: string, password: string): Promise<User> {
    const user: User = await this.userRepository.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const isMatch: boolean = Hash.compare(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Password does not match');
    }
    return user;
  }

  async validateJwt(payload: JwtPayload): Promise<User> {
    const user: User = await this.userRepository.findOneBy({
      id: payload.sub,
    });
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }
    return user;
  }

  getProfile(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  login(user: RequestUser) {
    const payload: JwtPayload = {
      sub: user.id,
    };
    return { access_token: this.jwtService.sign(payload) };
  }

  // async register(user: RegisterRequestDto): Promise<AccessToken> {
  //   const existingUser = await this.usersService.findOneByEmail(user.email);
  //   if (existingUser) {
  //     throw new BadRequestException('email already exists');
  //   }
  //   const hashedPassword = await bcrypt.hash(user.password, 10);
  //   const newUser: User = { ...user, password: hashedPassword };
  //   await this.usersService.create(newUser);
  //   return this.login(newUser);
  // }
}
