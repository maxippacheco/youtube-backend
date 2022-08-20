"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
router.post('/login', controllers_1.auth.loginController);
router.post('/register', [
    (0, express_validator_1.check)("name", "The name is required").notEmpty(),
    middlewares_1.validateFields
], controllers_1.auth.registerController);
exports.default = router;
