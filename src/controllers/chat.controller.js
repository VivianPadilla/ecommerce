import chatManager from "../dao/dataBaseManager/chatManager.js";
import logger from "../helper/logger/index.js";

const getMessages = async (req, res) => {
  try {
    const messages = await chatManager.getMessages();
    return res.status(200).send(messages);
  } catch (error) {
    logger.error("Error en chat.controller getMessages(): ", error);
    logger.debug("Error en chat.controller getMessages(): ", error);
    return res.status(500).send({ status: "error", error: error.message });
  }
};

const addMessage = async (req, res) => {
  try {
    const message = req.body;
    const messageAdded = await chatManager.addMessage(message);
    return res.status(200).send(messageAdded);
  } catch (error) {
    logger.error("Error en chat.controller addMessage(): ", error);
    logger.debug("Error en chat.controller addMessage(): ", error);
    return res.status(500).send({ status: "error", error: error.message });
  }
};

export default {
  getMessages,
  addMessage,
};
