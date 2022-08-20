"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createJWT = (uid = "") => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        jsonwebtoken_1.default.sign(payload, process.env.PRIVATE_KEY || '', (error, token) => {
            if (error) {
                reject("no se pudo resolver el token");
            }
            else {
                resolve(token || '');
            }
        });
    });
};
exports.createJWT = createJWT;
