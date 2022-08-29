import { Router } from "express";
import { check } from 'express-validator';
import { channel } from "../controllers";
import { validateFields, validateJWT } from '../middlewares';

const router = Router();

router.get('/', channel.getChannels );

router.post('/create', [
	validateJWT,
	check('name').notEmpty().withMessage('The name is necessary'),
	validateFields
], channel.createChannel);

router.post('/upload/:channelId', [
	validateJWT,
	// check('name').notEmpty().withMessage('The name is necessary'),
	// validateFields
], channel.uploadVideo);


// router.put('/upload/:channelId', [
// 	validateJWT,
// 	// check('name').notEmpty().withMessage('The name is necessary'),
// 	// validateFields
// ], channel.uploadVideo);


export default router;