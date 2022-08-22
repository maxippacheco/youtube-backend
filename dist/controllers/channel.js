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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createChannel = void 0;
const models_1 = require("../models");
const createChannel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    const [existChannelWithUser, existChannelName] = yield Promise.all([
        models_1.Channel.findOne({ userId: req.user._id }),
        models_1.Channel.findOne({ name })
    ]);
    if (existChannelName) {
        return res.status(400).json({
            ok: false,
            message: 'You can not have this user name'
        });
    }
    if (existChannelWithUser) {
        return res.status(400).json({
            ok: false,
            message: 'You can not have two channels'
        });
    }
    const channel = new models_1.Channel({ name, userId: req.user._id });
    yield channel.save();
    res.json({
        ok: true,
        channel
    });
});
exports.createChannel = createChannel;
