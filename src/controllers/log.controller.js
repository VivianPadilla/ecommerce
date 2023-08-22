import logger from "../helper/logger/index.js";

const getLogTest = async (req, res) => {
  try {
    logger.debug("Esto es un mensaje de depuración (debug)");
    logger.http("Esto es un mensaje de solicitud HTTP (http)");
    logger.info("Esto es un mensaje informativo (info)");
    logger.warning("Esto es un mensaje de advertencia (warning)");
    logger.error("Esto es un mensaje de error (error)");
    logger.fatal("Esto es un mensaje de fatal (fatal)");
    res.status(200).send({ message: "Prueba del logger" });
  } catch (error) {
    logger.error("Error en log.controller getLogTest(): ", error);
    logger.debug("Error en log.controller getLogTest(): ", error);
    return res.status(500).send({ status: "error", error: error.message });
  }
};

export default {
  getLogTest,
};
