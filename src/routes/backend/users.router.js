import usersController from "../../controllers/users.controller.js";
import { uploader } from "../../utils.js";
import { Router } from "express";
var router = Router();

// router.get('/api/users', usersController.getUser);
router.put('/premium/:uid', usersController.putUsersRole);
router.post('/:uid/documents', usersController.postDocuments);

export default router;
