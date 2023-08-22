import ticketsController from "../../controllers/tickets.controller.js";
import { Router } from "express";
var router = Router();

router.get('/', ticketsController.getTicket);
router.post('/', ticketsController.createTicket);

export default router;
