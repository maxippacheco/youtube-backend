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
exports.unsubscribeChannel = exports.subscribeChannel = void 0;
const mongoose_1 = require("mongoose");
const models_1 = require("../models");
const subscribeChannel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    if (!(0, mongoose_1.isValidObjectId)(userId)) {
        return res.status(400).json({
            ok: false,
            message: 'This ID is not valid'
        });
    }
    const [channelInSession, channelToFollow] = yield Promise.all([
        models_1.Channel.findOne({ userId: req.user._id }),
        models_1.Channel.findById(userId),
    ]);
    if (!channelInSession) {
        return res.status(400).json({
            ok: false,
            message: 'There is no channel with this ID'
        });
    }
    if (!channelToFollow) {
        return res.status(400).json({
            ok: false,
            message: 'There is no channel with this ID'
        });
    }
    if (channelToFollow.subscribers.includes(channelInSession._id)) {
        return res.status(400).json({
            ok: false,
            message: 'You already follow this user'
        });
    }
    if (channelInSession.subscribedTo.includes(channelToFollow._id)) {
        return res.status(400).json({
            ok: false,
            message: 'This user already follows you'
        });
    }
    channelToFollow.subscribers.push(channelInSession._id);
    channelInSession.subscribedTo.push(channelToFollow._id);
    yield Promise.all([
        channelToFollow.save(),
        channelInSession.save()
    ]);
    res.json({
        ok: true,
        message: 'User succesfully followed',
        channelToFollow,
        channelInSession
    });
});
exports.subscribeChannel = subscribeChannel;
const unsubscribeChannel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // userInSession
    const [userInSession, userToUnfollow] = yield Promise.all([
        models_1.Channel.findOne({ userId: req.user._id }),
        models_1.Channel.findById(req.params.userId),
    ]);
    if (!userInSession) {
        return res.status(400).json({
            ok: false,
            message: 'This user does not exist'
        });
    }
    // Validate if the user follow the user already
    if (!(userToUnfollow === null || userToUnfollow === void 0 ? void 0 : userToUnfollow.subscribers.includes(userInSession === null || userInSession === void 0 ? void 0 : userInSession._id))) {
        return res.status(400).json({
            ok: false,
            msg: 'You do not follow this user'
        });
    }
    userInSession === null || userInSession === void 0 ? void 0 : userInSession.subscribedTo.splice(userInSession === null || userInSession === void 0 ? void 0 : userInSession.subscribedTo.indexOf(userToUnfollow._id), 1);
    userToUnfollow.subscribers.splice(userToUnfollow.subscribers.indexOf(userInSession === null || userInSession === void 0 ? void 0 : userInSession._id), 1);
    yield Promise.all([
        userInSession.save(),
        userToUnfollow.save(),
    ]);
    res.json({
        ok: true,
        user_inSession: userInSession,
        user_toUnfollow: userToUnfollow
    });
});
exports.unsubscribeChannel = unsubscribeChannel;
