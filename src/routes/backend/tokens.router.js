import tokenController from "../../controllers/token.controller.js";
import { Router } from "express";
var router = Router();

router.post('/', tokenController.postNewToken);
router.get('/:token', tokenController.getToken);

export default router;
