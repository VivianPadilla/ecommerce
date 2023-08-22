import mockController from "../controllers/mock.controller.js";
import { Router } from "express";
var router = Router();

router.get('/', mockController.getMockProducts);

export default router;
