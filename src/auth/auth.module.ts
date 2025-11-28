import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStratery } from './jwt-strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ArtistsModule } from '../artists/artists.module';

@Module({
  imports: [
    UsersModule,
    ArtistsModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, JwtStratery],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
