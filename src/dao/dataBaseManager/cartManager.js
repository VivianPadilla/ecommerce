import { cartModel } from "../models/cart.model.js";
import productManager from "./productManager.js";

const getCarts = async () => {
  try {
    const carts = await cartModel.find().populate("products.product").lean();
    return carts;
  } catch (error) {
    throw new Error(error);
  }
}

const getProductsFromCart = async (cartId) => {
  try {
    const cartFound = await cartModel
      .findById(cartId)
      .populate("products.product");
    if (cartFound !== null) {
      return cartFound.products;
    } else {
      throw new Error("El carrito no existe.");
    }
  } catch (error) {
    throw new Error(error);
  }
}

const addCart = async () => {
  try {
    const cart = {};
    cart.products = [];
    const cartAdded = await cartModel.create(cart);
    return ["Carrito agregado correctamente", cartAdded];
  } catch (error) {
    throw new Error(error);
  }
}

const addProductToCart = async (cartId, productId, loggedUserEmail) => {
  try {
    const product = await productManager.getProduct(productId);

    if (product.owner === loggedUserEmail) {
      throw new Error("No puedes agregar un producto que es de tu propiedad");
    }

    const cartFound = await cartModel.findOne({ _id: cartId });
    if (cartFound === null) {
      throw new Error("El carrito no existe.");
    }
    const indexProductInCart = cartFound.products.findIndex(
      (item) => item.product._id.toString() === productId
    );

    if (indexProductInCart === -1) {
      cartFound.products.push({ product: productId, quantity: 1 });
    } else {
      cartFound.products[indexProductInCart].quantity += 1;
    }

    await cartFound.save();
  } catch (error) {
    throw new Error(error);
  }
}

const deleteProductFromCart = async (cartId, productId) => {
  try {
    const cartFound = await cartModel.findOne({ _id: cartId });
    if (cartFound === null) {
      throw new Error("El carrito no existe.");
    }

    const indexProductInCart = cartFound.products.findIndex(
      (item) => item.product._id.toString() === productId
    );

    if (indexProductInCart !== -1) {
      if (cartFound.products[indexProductInCart].quantity > 1) {
        cartFound.products[indexProductInCart].quantity -= 1;
      } else {
        cartFound.products.splice([indexProductInCart], 1);
      }
    } else {
      throw new Error("El producto no existe.");
    }

    await cartFound.save();
  } catch (error) {
    throw new Error(error);
  }
}

const updateProductsFromCart = async (cartId, productsToUpdate) => {
  try {
    const productsUpdated = await cartModel.findOneAndUpdate(
      { _id: cartId },
      { $set: { products: productsToUpdate } },
      { new: true }
    );

    if (!productsUpdated) {
      throw new Error("El carrito no existe.");
    } else {
      return productsUpdated;
    }
  } catch (error) {
    throw new Error(error);
  }
}

const updateQuantityFromProduct = async (cartId, productId, quantityToUpdate) => {
  try {
    const cart = await cartModel.findById(cartId);

    if (!cart) {
      throw new Error("El carrito no existe.");
    }

    const productIndex = cart.products.findIndex(
      (item) => item.product._id.toString() === productId
    );

    if (productIndex === -1) {
      throw new Error("El producto no existe en el carrito.");
    }

    cart.products[productIndex].quantity = quantityToUpdate;

    const result = await cart.save();

    if (!result) {
      throw new Error(
        "No se pudo guardar el carrito o no se realizaron modificaciones."
      );
    } else {
      return result;
    }
  } catch (error) {
    throw new Error(error);
  }
}

const deleteAllProductsFromCart = async (cartId) => {
  try {
    const productsDeleted = await cartModel.findOneAndUpdate(
      { _id: cartId },
      { $set: { products: [] } }
    );

    if (productsDeleted.nModified === 0) {
      throw new Error("El carrito no existe.");
    } else {
      return productsDeleted;
    }
  } catch (error) {
    throw new Error(error);
  }
}

const purchaseOneCart = async (cartId) => {
  try {
    const cart = await cartModel.findById(cartId);
    if (!cart) {
      throw new Error("El carrito no existe.");
    }

    const unprocessedProducts = [];
    const processedProducts = [];
    let total = 0;

    for (const item of cart.products) {
      const productId = item.product;
      const quantity = item.quantity;

      const product = await productManager.getProduct(productId);

      const isStockSufficient = product.stock >= quantity;
      const productStatus = isStockSufficient
        ? processedProducts
        : unprocessedProducts;

      if (isStockSufficient) {
        const newStock = product.stock - quantity;
        await productManager.updateProduct(productId, { stock: newStock });

        const productValue = product.price;
        const subtotal = productValue * quantity;
        total += subtotal;
      }

      productStatus.push(`${product._id}`);
    }

    for (const iterator of processedProducts) {
      await deleteProductInCart(cartId, iterator);
    }

    return { unprocessedProducts, processedProducts, total };
  } catch (error) {
    throw new Error(error);
  }
}

const deleteProductInCart = async (cartId, productId) => {
  try {
    const cartFound = await cartModel.findOne({ _id: cartId });
    if (cartFound === null) {
      throw new Error("El carrito no existe.");
    }

    const indexProductInCart = cartFound.products.findIndex(
      (item) => item.product.toString() === productId
    );

    if (indexProductInCart !== -1) {
      cartFound.products.splice([indexProductInCart], 1);
    } else {
      throw new Error("El producto no existe.");
    }

    await cartFound.save();
  } catch (error) { }
}

const deleteCart = async (cartId) => {
  try {
    const cartDeleted = await cartModel.deleteOne({ _id: cartId });
    if (cartDeleted.deletedCount !== 0) {
      return cartDeleted;
    } else {
      throw new Error("El carrito no existe.");
    }
  } catch (error) {
    throw new Error(error);
  }
}

export default {
  getCarts,
  getProductsFromCart,
  addCart,
  addProductToCart,
  deleteProductFromCart,
  updateProductsFromCart,
  updateQuantityFromProduct,
  deleteAllProductsFromCart,
  purchaseOneCart,
  deleteProductInCart,
  deleteCart,
}