"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
router.post('/subscribe/:userId', middlewares_1.validateJWT, controllers_1.subscribe.subscribeChannel);
router.post('/unsubscribe/:userId', middlewares_1.validateJWT, controllers_1.subscribe.unsubscribeChannel);
exports.default = router;
