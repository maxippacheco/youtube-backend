"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const models_1 = require("../models");
const validateJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(400).json({
            ok: false,
            message: 'Token not valid'
        });
    }
    try {
        const { uid } = jsonwebtoken_1.default.verify(token, process.env.PRIVATE_KEY || '');
        const user = yield models_1.User.findById(uid, '-password');
        if (!user) {
            return res.status(400).json({
                ok: false,
                message: "The user does not exist"
            });
        }
        req.user = user;
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            message: "Token not valid"
        });
    }
});
exports.validateJWT = validateJWT;
