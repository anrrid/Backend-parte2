export class InfoDto {
  args: object | undefined;
  platform: string;
  version: string;
  rss: string;
  path: string;
  pid: string;
  directory: string;
  procesadores: string;
  constructor(
    args: object | undefined,
    platform: string,
    version: string,
    rss: number,
    path: string,
    pid: number,
    directory: string,
    procesadores: number,
  ) {
    this.args = args || undefined;
    this.platform = platform;
    this.version = version;
    this.rss = `${rss}`;
    this.path = path;
    this.pid = `${pid}`;
    this.directory = directory;
    this.procesadores = `${procesadores}`;
  }
}
