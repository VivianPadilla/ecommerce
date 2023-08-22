import logController from "../controllers/log.controller.js";
import { Router } from "express";
var router = Router();

router.get('/', logController.getLogTest);

export default router;
