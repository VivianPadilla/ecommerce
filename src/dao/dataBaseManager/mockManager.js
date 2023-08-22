import productModel from "../models/product.model.js";
import { getMockProduct } from "../../utils.js";
import logger from "../../helper/logger/index.js";

const getMockProducts = async () => {
  try {
    let products = [];
    for (let i = 0; i < 100; i++) {
      const product = await productModel.create(getMockProduct());
      products.push(product);
    }
    return products;
  } catch (error) {
    logger.error("Error en mockManager getMockProducts(): ", error);
    logger.debug("Error en mockManager getMockProducts(): ", error);
    throw new Error(error);
  }
}

export default {
  getMockProducts
}
