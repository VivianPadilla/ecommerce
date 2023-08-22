import { ticketModel } from "../models/ticket.model.js";
import { v4 as uuidv4 } from "uuid";

const getTickets = async (limit, page) => {
  try {
    let options = {
      limit: limit,
      page: page,
    };
    return await ticketModel.paginate();
  } catch (error) {
    logger.error("Error en productManager getTickets(): ", error);
    logger.debug("Error en productManager getTickets(): ", error);
    throw new Error(error);
  }
}

const createTicket = async (buyerUserData) => {
  try {
    const now = new Date();
    const options = { timeZone: "America/Bogota" };
    now.toLocaleString("en-US", options);

    const code = uuidv4();
    const purchaseDatetime = now;

    buyerUserData.code = code;
    buyerUserData.purchaseDatetime = purchaseDatetime;

    const ticketAdded = await ticketModel.create(buyerUserData);

    return ticketAdded;
  } catch (error) {
    logger.error("Error en productManager createTicket(): ", error);
    logger.debug("Error en productManager createTicket(): ", error);
    throw new Error(error);
  }
}

export default {
  getTickets,
  createTicket,
}
