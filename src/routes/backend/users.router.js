import usersController from "../../controllers/users.controller.js";
import { uploader } from "../../utils.js";
import { Router } from "express";
var router = Router();

router.get('/', usersController.getUser);
router.put('/premium/:uid', usersController.putUsersRol);
router.post('/:uid/documents', uploader.fields([
	{ name: "profile_image", maxCount: 1 },
	{ name: "product_image", maxCount: 1 },
	{ name: "identification_document", maxCount: 1 },
	{ name: "address_document", maxCount: 1 },
	{ name: "statement_account_document", maxCount: 1 },
]), usersController.postDocuments);

export default router;
