import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
    sqlite3: {
        client: 'better-sqlite3',
        connection: { filename: path.resolve(__dirname, '../db/ecommerce.db3') },
        useNullAsDefault: true
    },
    mysql: {
        client: 'mysql',
        connection: {
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'dbecommerce'
        }
    },
    mongodb: {
        url:'mongodb+srv://coderhouse:coderhouse@cluster0.ijjaz.mongodb.net/dbuser?retryWrites=true&w=majority',
    },
    fileName: {
        messages: path.resolve(__dirname, '../data/messages.txt')
    },
    firebase: {
        privateKey: path.resolve(__dirname, '../private/users-a8ce0-firebase-adminsdk-mh4n5-2debbbadd0.json')
    },
    jwt: {
        privateKey: 'myprivatekey'
    }
}

export default config;