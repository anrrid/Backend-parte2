import msgModel from "../models/messageSchema";

/** Colocar servicio de sms con twilio */

// const twilio = require("../sms/twilio");

 (io) => {
  io.on("connection", async (socket) => {
    console.log(`User online ${socket.id}`);

    /*Traigo todos los mensajes */
    try {
      const allMsgChat = await msgModel.find();
      socket.emit("list-msg-chat", allMsgChat);
    } catch (error) {
      console.log(error);
    }

    socket.on("msg-chat", async (data) => {
      try {
        if (data.text.includes("administrator")) {
          twilio(data.author.id, data.text);
        }
        await msgModel.create(data);
      } catch (error) {
        console.log(error);
      }

      try {
        const allMsgChat = await msgModel.find();
        io.emit("list-msg-chat", allMsgChat);
      } catch (error) {
        console.log(error);
      }
    });

    socket.on("disconnect", () => {
      console.log(`User ${socket.id} offline`);
    });
  });

  return io;
};

export default io;
 