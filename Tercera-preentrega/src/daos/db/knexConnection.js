/*Configuracion para conectar database */
import knex from 'knex';
import { options } from '../connection/mariaDB.js';

class Container {
    constructor(options) {
        this.knex = knex(options);
    }

    async createProductTable() {
        return this.knex.schema.dropTableIfExists('products')
            .finally(() => {
              
                return this.knex.schema.createProductTable('products', table => {
                    table.increments('id').primary()
                    table.varchar('title', 50).notNullable()
                    table.float('price', 10.2).notNullable()
                    table.varchar('description', 100).notNullable()
                    table.integer('stock', 50).notNullable()
                    table.varchar('thumbnail', 3000).notNullable()
                })
            })
    }

    async createChatTable () {
        return this.knex.schema.createChatTable('history-chat')
        .finally(() => {

            return this.knex.schema.createChatTable('history-chat', table => {
                table.varchar('user').notNullable()
                table.varchar('msg').notNullable()
                table.varchar('date').notNullable()
            })
        })
    }


    async saveTable(table) {

        return this.knex('client').insert(table)
        
    }
    

    async getTable() {
        return this.knex('client').select('*')
    }
};



const containerProducts = new Container(options)
export default containerProducts;