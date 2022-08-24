import { Router } from "express";
import { subscribe } from "../controllers";
import { validateJWT } from "../middlewares";

const router = Router();

router.post('/subscribe/:userId', validateJWT ,subscribe.subscribeChannel);
router.post('/unsubscribe/:userId', validateJWT ,subscribe.unsubscribeChannel);

export default router;