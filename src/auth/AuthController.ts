import { Controller, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

type Logar = {
  email: string;
  password: string;
};

@Controller('auth')
@ApiTags('Authentication Route')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(AuthGuard('local'))
  @ApiProperty()
  @Post('login')
  async login(@Req() req: any, @Query() query: Logar) {
    return await this.authService.loginWithToken(req.user);
  }
}
