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
exports.registerController = exports.loginController = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const models_1 = require("../models");
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({ message: 'HELLO WORLD' });
});
exports.loginController = loginController;
const registerController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    // email exist in the model
    const isValidEmail = yield models_1.User.findOne({ email });
    if (isValidEmail) {
        return res.status(400).json({
            ok: false,
            message: 'This email is not valid'
        });
    }
    try {
        const user = new models_1.User({ name, email, password });
        user.password = bcryptjs_1.default.genSaltSync();
        yield user.save();
        res.json({
            ok: true,
            user
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            message: "Bad Request"
        });
    }
});
exports.registerController = registerController;
