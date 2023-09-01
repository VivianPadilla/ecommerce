import productManager from "../dao/dataBaseManager/productManager.js";
import cartManager from "../dao/dataBaseManager/cartManager.js";
import logger from "../helper/logger/index.js";

const getViewAllProducts = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const sort = req.query.sort || null;
    const query = req.query.query;
    const filter = {};
    if (query) {
      filter.$or = [{ category: query }, { status: query }];
    }
    const result = await productManager.getProducts(limit, page, sort, filter);
    const prevLink =
      result.prevPage === null
        ? null
        : `/api/products?page=${result.page - 1}`;
    const nextLink =
      result.nextPage === null
        ? null
        : `/api/products?page=${result.page + 1}`;

    const products = result.docs.map((product) => product.toObject());
    res.render("products", {
      payload: products,
      totalPages: result.totalPages,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink,
      nextLink,
      user: req.session.user,
      style: "index.css",
      title: "Lista de productos",
    });
  } catch (error) {
    logger.error("Error en views.controller getAllProducts(): ", error);
    logger.debug("Error en views.controller getAllProducts(): ", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const getViewRealtimeProducts = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const sort = req.query.sort || null;
    const query = req.query.query;
    const filter = {};
    if (query) {
      filter.$or = [{ category: query }, { status: query }];
    }
    const result = await productManager.getProducts(limit, page, sort, filter);
    const prevLink =
      result.prevPage === null
        ? null
        : `/api/products?page=${result.page - 1}`;
    const nextLink =
      result.nextPage === null
        ? null
        : `/api/products?page=${result.page + 1}`;

    const products = result.docs.map((product) => product.toObject());
    res.render("realtimeproducts", {
      payload: products,
      totalPages: result.totalPages,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink,
      nextLink,
      style: "index.css",
      title: "Lista de productos en tiempo real",
    });
  } catch (error) {
    logger.error("Error en views.controller getRealtimeProducts(): ", error);
    logger.debug("Error en views.controller getRealtimeProducts(): ", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const getViewChat = async (req, res) => {
  res.render("chat", {});
};

const getViewCart = async (req, res) => {
  const cartId = req.params.cid;
  const carts = await cartManager.getProductsFromCart(cartId);
  console.log("----> carts: ", carts);
  res.render("carts", {
    carts,
    cartId,
    user: req.session.user,
    title: "Carts",
  });
};

const getViewLogin = (req, res) => {
  res.render("login", {
    title: "Inicio de sesión",
  });
};

const getViewRegister = (req, res) => {
  res.render("register", {
    title: "Registro",
  });
};

const getViewLogout = (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      logger.error("Error en views.controller getViewLogout(): ", error);
      logger.debug("Error en views.controller getViewLogout(): ", error);
      res.status(500).json({ success: false, error: error.message });
    }
    res.redirect("/login");
  });
};

const getViewPasswordRecovery = (req, res) => {
  res.render("passwordRecovery", {
    title: "Recupera tu Contraseña",
  });
};

const getViewResetPassword = (req, res) => {
  res.render("resetPassword", {
    token: req.params.token,
    email: req.params.email,
    title: "Reestablecer contraseña",
  });
};

const getViewChangeRol = (req, res) => {
  res.render("changeRole", {
    userId: req.session.user.id,
    userRol: req.session.user.rol,
    title: "Cambiar rol del usuario",
  });
};

export default {
  getViewAllProducts,
  getViewRealtimeProducts,
  getViewChat,
  getViewCart,
  getViewLogin,
  getViewRegister,
  getViewLogout,
  getViewPasswordRecovery,
  getViewResetPassword,
  getViewChangeRol,
};
