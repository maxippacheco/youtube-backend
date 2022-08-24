"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscribeRoutes = exports.channelRoutes = exports.authRoutes = void 0;
var auth_1 = require("./auth");
Object.defineProperty(exports, "authRoutes", { enumerable: true, get: function () { return __importDefault(auth_1).default; } });
var channel_1 = require("./channel");
Object.defineProperty(exports, "channelRoutes", { enumerable: true, get: function () { return __importDefault(channel_1).default; } });
var subscribe_1 = require("./subscribe");
Object.defineProperty(exports, "subscribeRoutes", { enumerable: true, get: function () { return __importDefault(subscribe_1).default; } });
