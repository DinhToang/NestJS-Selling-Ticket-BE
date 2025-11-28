import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDTO } from '../users/dto/create-user.dto';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { LoginDTO } from './dto/login.dto';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}
  @Post('signup')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    type: User,
  })
  signup(
    @Body()
    userDTO: CreateUserDTO,
  ): Promise<User> {
    return this.userService.create(userDTO);
  }

  @Post('login')
  login(
    @Body()
    loginDTO: LoginDTO,
  ) {
    return this.authService.login(loginDTO);
  }

  @Get('env')
  testEnvVariable() {
    return this.authService.getEnvVariable();
  }
}
