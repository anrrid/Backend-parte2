import messageContainer from "../daos/services/messageContainer.js"
import {normalize, schema} from "normalizr";
import {loggerWarn, loggerTrace, loggerDefault, loggerError} from "../logger/log4js.js";

const message = new messageContainer();

export async function createMessage (req, res) {
    try {
        const createMessage = await message.createMessage(req.body);
        res.json({msg: "Message: ", message: createMessage});
    } catch (error) {
        loggerError.error(error);
    }
}

export async function getAllMessages (req, res) {
    loggerTrace.trace("run getAllMessages")

    try {
        const getAllMsgs = await message.getAllMessage();
        const history = {id: 1, content: getAllMsgs};
        //Crea entidad autor
        const user = new schema.Entity("author");
        const userMsg = new schema.Entity(
            "chat",
            {
                author: user
            },
            {
                id: (value) => value._id.tostring()
            }
        );
        
        const chat = new schema.Entity("chat", {
            content : {userMsg}
        });

        const normalizedChat = normalize(history, chat);

        console.log(JSON.stringify(getAllMsgs).length);
        console.log(JSON.stringify(normalizedChat).length);
    } catch (error) {
        loggerError.error(error);
        res.json(error);
    }
};