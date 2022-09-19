export class ReturnMensajeDto {
  id: object | string;
  author: object;
  text: string;
  constructor(id: string, author: object, text: string) {
    this.id = `${id}`;
    this.author = author;
    this.text = text;
  }
}
