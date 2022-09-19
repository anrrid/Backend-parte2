export class ReturnProductDto {
  id: string;
  nombre: string;
  precio: number;
  foto: string;
  constructor(
    id: object | string,
    nombre: string,
    precio: number,
    foto: string,
  ) {
    this.id = `${id}`;
    this.nombre = nombre;
    this.precio = precio;
    this.foto = foto;
  }
}
