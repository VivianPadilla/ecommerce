import { messagesModel } from "../models/chat.model.js";

const getMessages = async () => {
  try {
    const messages = await messagesModel.find();
    return messages;
  } catch (error) {
    logger.error("Error en chatManager getMessages(): ", error);
    logger.debug("Error en chatManager getMessages(): ", error);
    throw new Error(error);
  }
}

const addMessage = async (message) => {
  try {
    const messageAdded = await messagesModel.create(message);
    return messageAdded;
  } catch (error) {
    logger.error("Error en chatManager addMessage(): ", error);
    logger.debug("Error en chatManager addMessage(): ", error);
    throw new Error(error);
  }

}

export default {
  getMessages,
  addMessage,
};