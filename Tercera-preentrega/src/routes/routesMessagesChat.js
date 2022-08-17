/*Requiero controladores de messages */
import { getAllMessages, createMessage } from '../controller/messages.js';
export default (router) => {
    router
        .get("/api/message/list", getAllMessages)
        .post("/api/message/create", createMessage)
    return router   
}