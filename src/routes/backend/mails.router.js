import mailController from "../../controllers/mail.controller.js";
import { Router } from "express";
var router = Router();

router.get('/:mail/:token', mailController.sendMailResetPassword);

export default router;
