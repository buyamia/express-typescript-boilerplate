import { Logger } from '@lib/logger';
import { AuthService } from '@services/auth.service';
import { IsNotEmpty, IsString } from 'class-validator';
import { Response } from 'express';
import { Body, Controller, Post, Res } from 'routing-controllers';
import { Service } from 'typedi';

import { UserService } from '@services/user.service';

class LoginBody {
  @IsString()
  @IsNotEmpty()
  username: string = '';

  @IsString()
  @IsNotEmpty()
  password: string = '';
}

class RegisterBody extends LoginBody {
  @IsString()
  @IsNotEmpty()
  name: string = '';
}

@Controller('/auth')
@Service()
export class AuthController {
  constructor(
    private authService: AuthService,
  ) {}

  @Post('/login')
  async login(@Body() body: LoginBody, @Res() res: Response) {
    const token = await this.authService.login(body.username, body.password);
    if (!token) {
      return res.status(401).json({ message: 'Username or password is invalid.' });
    }

    return res.json({
      data: { token },
    });
  }

  @Post('/register')
  async register(@Body() body: RegisterBody, @Res() res: Response) {
    const token = await this.authService.register(body.name, body.username, body.password);

    return res.json({
      data: { token },
    });
  }
}