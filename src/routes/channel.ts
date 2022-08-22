import { Router } from "express";
import { check } from 'express-validator';
import { channel } from "../controllers";
import { validateFields, validateJWT } from '../middlewares';

const router = Router();

router.post('/create', [
	validateJWT,
	check('name').notEmpty().withMessage('The name is necessary'),
	validateFields

], channel.createChannel)

export default router;