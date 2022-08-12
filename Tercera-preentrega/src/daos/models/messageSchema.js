import { Schema, model } from 'mongoose';

const msgCollection = 'message';

//SCHEMA
const msgSchema = new Schema({
        author: {
            id: {type: String, require: true},
            name: {type: String, require: true},
            subname: {type: String, require: true},
            age: {type: Number, require: true},
            nickname: {type: String, require: true},
            avatar: {type: String, require: true},
        },
        text: {type: String, require: true},
        date: {type: String, require: true}
});


const msgModel = model(msgCollection, msgSchema);

export default msgModel;