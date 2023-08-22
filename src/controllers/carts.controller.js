import cartsManager from "../dao/dataBaseManager/cartManager.js";

const getCarts = async (req, res) => {
  try {
    const carts = await cartsManager.getCarts();
    return res.status(200).send(carts);
  } catch (error) {
    logger.error("Error en carts.controller getCarts(): ", error);
    logger.debug("Error en carts.controller getCarts(): ", error);
    return res.status(500).send({ status: "error", error: error.message });
  }
};

const getCart = async (req, res) => {
  try {
    const carts = await cartsManager.getCarts();
    return res.status(200).send(carts);
  } catch (error) {
    logger.error("Error en carts.controller getCarts(): ", error);
    logger.debug("Error en carts.controller getCarts(): ", error);
    return res.status(500).send({ status: "error", error: error.message });
  }
};

const getProductsFromCart = async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productsFromCart = await cartsManager.getProductsFromCart(cartId);

    return res.status(200).send(productsFromCart);
  } catch (error) {
    logger.error("Error en carts.controller getProductsFromCart(): ", error);
    logger.debug("Error en carts.controller getProductsFromCart(): ", error);
    return res.status(500).send({ status: "error", error: error.message });
  }
};

const addCart = async (req, res) => {
  try {
    const addCartResponse = await cartsManager.addCart();
    return res
      .status(200)
      .send({ status: "success", message: addCartResponse[1] });
  } catch (error) {
    logger.error("Error en carts.controller addCart(): ", error);
    logger.debug("Error en carts.controller addCart(): ", error);
    return res.status(500).send({ status: "error", error: error.message });
  }
};

const addProductToCart = async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const loggedUserEmail = req.session.user.email;

    const addProductToCartResponse = await cartsManager.addProductToCart(
      cartId,
      productId,
      loggedUserEmail
    );

    return res
      .status(200)
      .send({ status: "success", message: addProductToCartResponse });
  } catch (error) {
    logger.error("Error en carts.controller addProductToCart(): ", error);
    logger.debug("Error en carts.controller addProductToCart(): ", error);
    return res.status(500).send({ status: "error", error: error.message });
  }
};

const deleteProductFromCart = async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;

    const deleteProductFromCartResponse =
      await cartsManager.deleteProductFromCart(cartId, productId);

    return res
      .status(200)
      .send({ status: "success", message: deleteProductFromCartResponse });
  } catch (error) {
    logger.error("Error en carts.controller deleteProductFromCart(): ", error);
    logger.debug("Error en carts.controller deleteProductFromCart(): ", error);
    return res.status(500).send({ status: "error", error: error.message });
  }
};

const updateProductsFromCart = async (req, res) => {
  try {
    const cartId = req.params.cid;
    const products = req.body;

    const updateProductsFromCartResponse =
      await cartsManager.updateProductsFromCart(cartId, products);

    return res
      .status(200)
      .send({ status: "success", message: updateProductsFromCartResponse });
  } catch (error) {
    logger.error("Error en carts.controller updateProductsFromCart(): ", error);
    logger.debug("Error en carts.controller updateProductsFromCart(): ", error);
    return res.status(500).send({ status: "error", error: error.message });
  }
};

const updateQuantityFromProduct = async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = req.body.newQuantity;

    const updateQuantityFromProductResponse =
      await cartsManager.updateQuantityFromProduct(cartId, productId, quantity);

    return res
      .status(200)
      .send({ status: "success", message: updateQuantityFromProductResponse });
  } catch (error) {
    logger.error("Error en carts.controller updateQuantityFromProduct(): ", error);
    logger.debug("Error en carts.controller updateQuantityFromProduct(): ", error);
    return res.status(500).send({ status: "error", error: error.message });
  }
};

const deleteAllProductsFromCart = async (req, res) => {
  try {
    const cartId = req.params.cid;

    const deleteAllProductsFromCartResponse =
      await cartsManager.deleteAllProductsFromCart(cartId);
    return res
      .status(200)
      .send({ status: "success", message: deleteAllProductsFromCartResponse });
  } catch (error) {
    logger.error("Error en carts.controller deleteAllProductsFromCart(): ", error);
    logger.debug("Error en carts.controller deleteAllProductsFromCart(): ", error);
    return res.status(500).send({ status: "error", error: error.message });
  }
};

const cartPurchase = async (req, res) => {
  try {
    const cartId = req.params.cid;

    const purchaseCartResponse = await cartsManager.purchaseOneCart(cartId);

    req.session.user.totalPurchase = purchaseCartResponse.total;

    return res.status(200).send({
      status: "success",
      message: purchaseCartResponse,
    });
  } catch (error) {
    logger.error("Error en carts.controller cartPurchase(): ", error);
    logger.debug("Error en carts.controller cartPurchase(): ", error);
    return res.status(500).send({ status: "error", error: error.message });
  }
};

const deleteCart = async (req, res) => {
  try {
    const cartId = req.params.cid;

    const deleteCartResponse = await cartsManager.deleteCart(cartId);

    return res.status(200).send({
      status: "success",
      message: deleteCartResponse,
    });
  } catch (error) {
    logger.error("Error en carts.controller deleteCart(): ", error);
    logger.debug("Error en carts.controller deleteCart(): ", error);
    return res.status(500).send({ status: "error", error: error.message });
  }
}

export default {
  getCarts,
  getCart,
  getProductsFromCart,
  addCart,
  addProductToCart,
  deleteProductFromCart,
  updateProductsFromCart,
  updateQuantityFromProduct,
  deleteAllProductsFromCart,
  cartPurchase,
  deleteCart
};
