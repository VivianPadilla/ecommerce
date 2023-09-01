import ticketManager from "../dao/dataBaseManager/ticketManager.js";
import logger from "../helper/logger/index.js";

const getTicket = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const tickets = await ticketManager.getTickets(limit, page);
    return res.status(200).send(tickets);
  } catch (error) {
    logger.error("Error en tickets.controller getTicket(): ", error);
    logger.debug("Error en tickets.controller getTicket(): ", error);
    return res.status(500).send({ status: "error", error: error.message });
  }
};

const createTicket = async (req, res) => {
  try {
    const amount = req.session.user.totalPurchase;

    const purchaser = req.session.user.email;
    const buyerUserData = {
      amount,
      purchaser,
    };
    const ticketCreated = await ticketManager.createTicket(buyerUserData);
    return res.status(200).send(ticketCreated);
  } catch (error) {
    logger.error("Error en tickets.controller createTicket(): ", error);
    logger.debug("Error en tickets.controller createTicket(): ", error);
    return res.status(500).send({ status: "error", error: error.message });
  }
};

export default {
  getTicket,
  createTicket,
};
