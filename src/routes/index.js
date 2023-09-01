import { Router } from "express";
import backendRouter from "./backend/index.js";
import frontendRouter from "./frontend/views.router.js";
import logRouter from "./log.router.js";
import mockRouter from "./mock.router.js";
import mailRouter from "./backend/mails.router.js";

const router = Router();
router.use("/", frontendRouter);
router.use("/api", backendRouter);
router.use("/mock-products", mockRouter);
router.use("/log", logRouter);

export default router;
