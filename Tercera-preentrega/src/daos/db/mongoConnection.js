import mongoose from 'mongoose';
const MONGO_URI = require('../../config/globals')

export const initMongoDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
             useNewUrlParser: true,
              useUnifiedTopology: true,
               useCreateInex: true 
            });
            return `Connection success to ${MONGO_URI}`
    } catch (error) {
        console.log(`ERROR => ${error}`);
        return error;
    }
};
