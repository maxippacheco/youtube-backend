import { Router } from "express";
import { check } from "express-validator";
import { auth } from "../controllers";
import { validateFields } from '../middlewares';

const router = Router();

router.post('/login', auth.loginController);
router.post('/register', [
	check("name", "The name is required").notEmpty(),
	validateFields 

],auth.registerController);


export default router;
