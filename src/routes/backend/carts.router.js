import cartsController from "../../controllers/carts.controller.js";
import { Router } from "express";
var router = Router();

router.get('/', cartsController.getCarts);
router.get('/:cid', cartsController.getProductsFromCart);
router.post('/', cartsController.addCart);
router.post('/:cid/product/:pid', cartsController.addProductToCart);
router.delete('/:cid/products/:pid', cartsController.deleteProductFromCart);
router.put('/:cid', cartsController.updateProductsFromCart);
router.put('/:cid/products/:pid', cartsController.updateQuantityFromProduct);
router.delete('/:cid', cartsController.deleteAllProductsFromCart);
router.delete('/:cid/delete', cartsController.deleteCart);
router.post('/:cid/purchase', cartsController.cartPurchase);

export default router;
