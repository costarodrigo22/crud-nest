import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../users/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './AuthController';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule,
    UserModule,
    forwardRef(() => UserModule),
    JwtModule.register({
      privateKey: process.env.TOKEN_JWT_SECRET,
      signOptions: { expiresIn: '300s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
