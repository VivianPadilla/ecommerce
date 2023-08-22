import passport from "passport";
import usersController from "../../controllers/users.controller.js";
import { Router } from "express";
var router = Router();

router.post('/register', passport.authenticate("register", { failureMessage: true }), usersController.registerUser);
router.post('/login', passport.authenticate("login", { failureMessage: true }), usersController.loginUser);
router.get('/current', usersController.getUser);
router.get('/:email', usersController.getUserByEmail);
router.put('/:email', usersController.putUserByEmail);

export default router;
