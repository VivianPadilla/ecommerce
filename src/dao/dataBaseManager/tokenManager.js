import { tokensModel } from "../models/token.model.js";
import crypto from "crypto";


const postToken = async () => {
  try {
    const token = crypto.randomBytes(10).toString("hex");
    const tokenAdded = await tokensModel.create({
      token: token,
      expireAt: Date.now(),
    });
    return tokenAdded;
  } catch (error) {
    throw new Error(error);
  }
}

const getToken = async (token) => {
  try {
    const tokenFound = await tokensModel.findOne({ token: token });
    if (tokenFound !== null) {
      return tokenFound;
    } else {
      throw new Error("El token no existe o ya vencio");
    }
  } catch (error) {
    throw new Error(error);
  }
}

export default {
  postToken,
  getToken
}
