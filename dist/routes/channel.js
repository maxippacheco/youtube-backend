"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
router.post('/create', [
    middlewares_1.validateJWT,
    (0, express_validator_1.check)('name').notEmpty().withMessage('The name is necessary'),
    middlewares_1.validateFields
], controllers_1.channel.createChannel);
exports.default = router;
