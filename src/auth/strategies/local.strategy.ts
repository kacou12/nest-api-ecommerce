import { AuthService } from './../auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }
  async validate(email: string, password: string) {
    const user = await this.authService.validateLocal(email, password);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
