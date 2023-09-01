import { tokensModel } from "../models/token.model.js";
import crypto from "crypto";


const postToken = async () => {
  try {
    const token = crypto.randomBytes(10).toString("hex");
    const tokenAdd = await tokensModel.create({
      token: token,
      expireAt: Date.now(),
    });
    return tokenAdd;
  } catch (error) {
    logger.error("Error en tokenManager postToken(): ", error);
    logger.debug("Error en tokenManager postToken(): ", error);
    throw new Error(error);
  }
}

const getToken = async (token) => {
  try {
    const tokenFound = await tokensModel.findOne({ token: token });
    if (tokenFound !== null) {
      return tokenFound;
    } else {
      throw new Error("Ups! El token ya vencio");
    }
  } catch (error) {
    logger.error("Error en tokenManager postToken(): ", error);
    logger.debug("Error en tokenManager postToken(): ", error);
    throw new Error(error);
  }
}

export default {
  postToken,
  getToken
}
