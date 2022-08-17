import { getAllMessages } from '../controller/messages.js';

export default (router) => {
    router
        .get('/chat-io', getAllMessages);

    return router
}