import msgModel from '../models/messageSchema.js'

export default class {

    async createMessage(msg) {
        await msgModel.create(msg);
    }

    async getAllMessage() {
        const allMessages = await messagesChat.find().lean();
        return allMessages;
    }
}