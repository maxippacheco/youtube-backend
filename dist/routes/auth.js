"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
router.post('/login', controllers_1.auth.loginController);
router.post('/register', controllers_1.auth.registerController);
exports.default = router;
