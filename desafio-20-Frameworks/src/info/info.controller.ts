import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { InfoService } from './info.service';

@Controller('info')
export class InfoController {
  constructor(private readonly infoService: InfoService) {}

  @Get()
  renderInfo(@Res() res: Response) {
    const info = this.infoService.getInfo();
    res.render('info.hbs', info);
  }
}
