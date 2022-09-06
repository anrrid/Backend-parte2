import supertest from "supertest";
import { expect } from "chai";

const request = supertest("http://localhost:8080");

const testProduct = {
  nombre: "Chai Moka Supertest",
  precio: 999,
  foto: "pruebas.com",
};

describe("test api rest", () => {
  describe("GET", () => {
    it("debería retornar status 200 y un array vacio o de productos", async () => {
      const response = await request.get("/products_api");
      expect(response.status).to.eql(200);
      expect(Array.isArray(response.body)).to.be.true;
    });
  });
  describe("POST", () => {
    it("debería crear un nuevo producto y devolver un objeto con las propiedades created y products", async () => {
      const response = await request.post("/products_api").send(testProduct);
      expect(response.status).to.eql(200);
      expect(response.body).to.have.property("created");
      expect(response.body).to.have.property("products");
      expect(response.body.created).to.have.property("id");
      expect(response.body.created.nombre).to.eql(testProduct.nombre);
      expect(response.body.created.precio).to.eql(testProduct.precio);
      expect(response.body.created.foto).to.eql(testProduct.foto);
      testProduct.id = response.body.created.id;
    });
  });
  describe("PUT", () => {
    it("debería editar el elemento previamente creado y devolver un objeto con las propiedades edited y products", async () => {
      const response = await request.put(`/products_api/${testProduct.id}`).send({ precio: 0 });
      expect(response.status).to.eql(200);
      expect(response.body).to.have.property("edited");
      expect(response.body).to.have.property("products");
      expect(response.body.edited).to.have.property("id");
      expect(response.body.edited.id).to.eql(testProduct.id);
    });
  });
  describe("DELETE", () => {
    it('debería eliminar el producto previamente creado y devolver un objeto con la propiedad mensaje' + 
    'que contenga el siguiente string: "Deleted product with id: id"', async () => {
      const response = await request.delete(`/products_api/${testProduct.id}`);
      expect(response.status).to.eql(200);
      expect(response.body).to.have.property("message");
      expect(response.body.message).to.eql(
        `Deleted product with id: ${testProduct.id}`
      );
    });
  });
});
