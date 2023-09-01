import viewsController from "../../controllers/views.controller.js";
import { Router } from "express";
var router = Router();

router.get('/products', viewsController.getViewAllProducts);
router.get('/realtimeproducts', viewsController.getViewRealtimeProducts);
router.get('/chat', viewsController.getViewChat);
router.get('/carts/:cid', viewsController.getViewCart);
router.get('/login', viewsController.getViewLogin);
router.get('/logout', viewsController.getViewLogout);
router.get('/register', viewsController.getViewRegister);
router.get('/password-recovery', viewsController.getViewPasswordRecovery);
router.get('/reset-password/:token/:email', viewsController.getViewResetPassword);
router.get('/change-rol', viewsController.getViewChangeRol);


export default router;
