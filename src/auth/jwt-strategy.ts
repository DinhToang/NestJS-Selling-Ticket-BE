import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PayloadType } from './types';
import { ConfigService } from '@nestjs/config';
import 'dotenv/config';
@Injectable()
export class JwtStratery extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('SECRET')!,
    });
  }


  async validate(payload: PayloadType) {
    return {
      userId: payload.artistId,
      email: payload.email,
      artistId: payload.artistId,
    };
  }
}
