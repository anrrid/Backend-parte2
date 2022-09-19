import {
  Controller,
  Request,
  Post,
  UseGuards,
  Body,
  Get,
  Res,
  UseFilters,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { UserDto } from 'src/dto/user.dto';
import { AuthenticatedGuard } from './authenticated.guard';
import { LocalAuthGuard } from './local.guard';
import { ViewAuthFilter } from './auth.filter';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get(['login', '/'])
  getLogin(@Res() res: Response) {
    res.render('login.hbs');
  }

  @Get('register')
  getRegister(@Res() res: Response) {
    res.render('register.hbs');
  }

  @Post('register')
  async register(
    @Body() userData: UserDto,
    @Res() res: Response,
  ): Promise<any> {
    await this.authService.register(userData.email, userData.password);
    res.redirect('/auth/login');
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @UseFilters(ViewAuthFilter)
  async login(@Request() req, @Res() res: Response): Promise<any> {
    res.render('main.hbs', { username: req.user });
  }
  @Get('logout')
  @UseGuards(AuthenticatedGuard)
  async logout(@Request() req, @Res() res: Response) {
    res.render('logout.hbs', { username: req.user });
    req.session.destroy();
  }
}
