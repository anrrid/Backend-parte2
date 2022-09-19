import { Controller, Get, Res, Request } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  renderMain(@Res() res: Response, @Request() req) {
    if (!req.user) res.redirect('/auth/login');
    else
      res.render('main.hbs', {
        username: req.user,
      });
  }
}
