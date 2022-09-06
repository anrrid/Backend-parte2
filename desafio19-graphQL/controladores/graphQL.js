import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import { getAllProducts, addProduct, updateProduct, removeProduct} from "../logica/productos.js"

const schema = buildSchema (
   `type Product {
    id: ID!
    nombre: String
    precio: Float
    foto: String
   } 
   input productInput {
      nombre: String
      precio: Float
      foto: String
   }
   type Query {
    getAllProducts: [Product]
   }
   type Mutation {
    addProduct (data: productInput): Product
    updateProduct(id: ID!, data: productInput): Product,
    removeProduct(id: ID!): [Product],
   }
   `);

   class graphQL {
    constructor () {
       return graphqlHTTP ({
        schema : schema,
        rootValue: {
            getAllProducts,
            addProduct,
            updateProduct,
            removeProduct
        },
        graphiql: true,
       })
    }
   };

   export default graphQL;