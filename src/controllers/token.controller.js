import tokenManager from "../dao/dataBaseManager/tokenManager.js";
import logger from "../helper/logger/index.js";

const postNewToken = async (req, res) => {
  try {
    const token = await tokenManager.postToken();
    return res.status(200).send(token);
  } catch (error) {
    logger.error("Error en token.controller postNewToken(): ", error);
    logger.debug("Error en token.controller postNewToken(): ", error);
    return res.status(500).send({ status: "error", error: error.message });
  }
};

const getToken = async (req, res) => {
  try {
    const token = req.params.token;
    const tokenExists = await tokenManager.getToken(token);
    return res.status(200).send({ status: "success", payload: tokenExists });
  } catch (error) {
    logger.error("Error en token.controller getToken(): ", error);
    logger.debug("Error en token.controller getToken(): ", error);
    return res.status(500).send({ status: "error", error: error.message });
  }
};

export default {
  postNewToken,
  getToken,
};
