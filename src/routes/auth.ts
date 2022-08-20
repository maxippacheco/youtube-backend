import { Router } from "express";
import { check } from "express-validator";
import { auth } from "../controllers";
import { validateFields } from '../middlewares';

const router = Router();

router.post('/login',[
	check("email").notEmpty().isEmail().withMessage("Email is required and must be an email"),
	check("password").notEmpty().isLength({ min: 6 }).withMessage("Password is required and must be bigger than 6 characters"	),
	validateFields
],auth.loginController);

router.post('/register', [
	check("name").notEmpty().withMessage("The name is required"),
	check("email").notEmpty().isEmail().withMessage("Email is required and must be an email"),
	check("password").notEmpty().isLength({ min: 6 }).withMessage("Password is required and must be bigger than 6 characters"	),
	validateFields 

],auth.registerController);


export default router;
