import chatController from "../../controllers/chat.controller.js";
import { Router } from "express";
var router = Router();

router.get('/', chatController.getMessages);
router.post('/', chatController.addMessage);

export default router;
