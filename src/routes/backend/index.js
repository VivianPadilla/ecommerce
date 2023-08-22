import productsRouter from "./products.router.js";
import usersRouter from "./users.router.js";
import sessionsRouter from "./sessions.router.js";
import tokensRouter from "./tokens.router.js";
import cartsRouter from "./carts.router.js";
import ticketsRouter from "./tickets.router.js";
import mailsRouter from "./mails.router.js";
import chatRouter from "./chat.router.js";
import { Router } from "express";
var router = Router();

router.use("/products", productsRouter);
router.use("/users", usersRouter);
router.use("/sessions", sessionsRouter);
router.use("/tokens", tokensRouter);
router.use("/carts", cartsRouter);
router.use("/tickets", ticketsRouter);
router.use("/mails", mailsRouter);
router.use("/chat", chatRouter);

export default router;
