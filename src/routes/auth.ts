import { Router } from "express";
import { auth } from "../controllers";

const router = Router();

router.post('/login', auth.loginController);
router.post('/register', auth.registerController);


export default router;
