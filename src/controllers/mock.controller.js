import mockManager from "../dao/dataBaseManager/mockManager.js";
import logger from "../helper/logger/index.js";

const getMockProducts = async (req, res) => {
  try {
    const response = await mockManager.getMockProducts();
    return res.status(200).send(response);
  } catch (error) {
    logger.error("Error en mock.controller getMockProducts(): ", error);
    logger.debug("Error en mock.controller getMockProducts(): ", error);
    return res.status(500).send({ status: "error", error: error.message });
  }
};

export default {
  getMockProducts,
};
