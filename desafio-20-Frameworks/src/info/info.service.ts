import { Injectable } from '@nestjs/common';
import { InfoDto } from '../dto/info.dto';
import * as os from 'os';

@Injectable()
export class InfoService {
  getInfo(): InfoDto {
    return new InfoDto(
      process.argv.slice(2),
      process.platform,
      process.version,
      process.memoryUsage().rss,
      process.execPath,
      process.pid,
      process.cwd(),
      os.cpus().length,
    );
  }
}
