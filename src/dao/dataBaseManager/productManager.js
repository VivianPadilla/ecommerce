import productModel from "../models/product.model.js";
import logger from "../../helper/logger/index.js";
const productNotExist = "El producto no existe";

const getProducts = async (limit, page, sort, filter) => {
  try {
    let options = {
      limit: limit,
      page: page,
      sort: { sort },
    };
    if (sort === "desc") {
      options.sort = { price: -1 };
    } else if (sort === "asc") {
      options.sort = { price: 1 };
    }
    options.sort = { price: 1 };
    return await productModel.paginate(filter, options);
  } catch (error) {
    logger.error("Error en productManager getProducts(): ", error);
    logger.debug("Error en productManager getProducts(): ", error);
    throw new Error(error);
  }
};

const getProduct = async (id) => {
  try {
    const product = await productModel.findById(id);
    if (product !== null) {
      return product;
    } else {
      throw new Error(productNotExist);
    }
  } catch (error) {
    logger.error("Error en productManager getProduct(): ", error);
    logger.debug("Error en productManager getProduct(): ", error);
    throw new Error(error);
  }
}

const addProduct = async (product) => {
  try {
    const response = await productModel.create(product);
    return ["Producto agregado correctamente", response];
  } catch (error) {
    logger.error("Error en productManager addProduct(): ", error);
    logger.debug("Error en productManager addProduct(): ", error);
    throw new Error(error);
  }
};

const updateProduct = async (productId, product) => {
  try {
    const response = await productModel.updateOne(
      { _id: productId },
      product
    );
    if (response.n !== 0) {
      return response;
    } else {
      throw new Error(productNotExist);
    }
  } catch (error) {
    logger.error("Error en productManager updateProduct(): ", error);
    logger.debug("Error en productManager updateProduct(): ", error);
    throw new Error(error);
  }
};

const deleteProduct = async (productId, userEmail, userRole) => {
  try {
    const product = await productModel.findById(productId);
    if (!product) {
      throw new Error(productNotExist);
    }
    if (
      userRole.toUpperCase() === "ADMIN" ||
      product.owner === userEmail
    ) {
      const response = await productModel.deleteOne({ _id: productId });
      if (response.deletedCount !== 0) {
        return ["Producto eliminado satisfactoriamente", productId];
      } else {
        throw new Error(response);
      }
    } else {
      throw new Error("No tienes permiso para eliminar este producto");
    }
  } catch (error) {
    logger.error("Error en productManager deleteProduct(): ", error);
    logger.debug("Error en productManager deleteProduct(): ", error);
    throw new Error(error);
  }
};

export default {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};
