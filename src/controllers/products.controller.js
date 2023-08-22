import socketServer from "../socket.server.js";
import productManager from "../dao/dataBaseManager/productManager.js";
import logger from "../helper/logger/index.js";

const getProducts = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const sort = req.query.sort || null;
    const query = req.query.query;
    const filter = {};
    if (query) {
      filter.$or = [{ category: query }, { status: query }];
    }
    const products = await productManager.getProducts(
      limit,
      page,
      sort,
      filter
    );
    const prevLink =
      products.prevPage === null
        ? null
        : `http://localhost:8080/api/products?page=${products.page - 1}`;
    const nextLink =
      products.nextPage === null
        ? null
        : `http://localhost:8080/api/products?page=${products.page + 1}`;
    return res.status(200).send({
      status: "success",
      payload: products.docs,
      totalPages: products.totalPages,
      prevPage: products.prevPage,
      nextPage: products.nextPage,
      page: products.page,
      hasPrevPage: products.hasPrevPage,
      hasNextPage: products.hasNextPage,
      prevLink,
      nextLink,
    });
  } catch (error) {
    logger.error("Error en products.controller getProducts(): ", error);
    logger.debug("Error en products.controller getProducts(): ", error);
    return res.status(500).send({ status: "error", error: error.message });
  }
};

const addProduct = async (req, res) => {
  try {
    const { code, title, description, price, stock, category, status, images } =
      req.body;
    let owner = req.session.user.email ? req.session.user.email : "admin";
    const product = {
      code,
      title,
      description,
      price,
      stock,
      category,
      status,
      owner,
      images,
    };
    const response = await productManager.addProduct(product);
    socketServer.emit("productAdded", response[1]);
    return res
      .status(200)
      .send({ status: "success", message: response[0] });
  } catch (error) {
    logger.error("Error en products.controller addProduct(): ", error);
    logger.debug("Error en products.controller addProduct(): ", error);
    return res.status(500).send({ status: "error", error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.pid;
    const product = req.body;
    const response = await productManager.updateProduct(
      productId,
      product
    );
    return res
      .status(200)
      .send({ status: "success", message: response });
  } catch (error) {
    logger.error("Error en products.controller updateProduct(): ", error);
    logger.debug("Error en products.controller updateProduct(): ", error);
    return res.status(500).send({ status: "error", error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.pid;
    const userEmail = req.session.user.email;
    const userRole = req.session.user.role;
    const response = await productManager.deleteProduct(
      productId,
      userEmail,
      userRole
    );
    socketServer.emit("productDeleted", response[1]);
    return res
      .status(200)
      .send({ status: "success", message: response[0] });
  } catch (error) {
    logger.error("Error en products.controller deleteProduct(): ", error);
    logger.debug("Error en products.controller deleteProduct(): ", error);
    return res.status(500).send({ status: "error", error: error.message });
  }
};

export default {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
};
