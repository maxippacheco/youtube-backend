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
exports.uploadVideo = exports.createChannel = exports.getChannels = void 0;
const cloudinary_1 = require("cloudinary");
const models_1 = require("../models");
const getChannels = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const [total, channels] = yield Promise.all([
        models_1.Channel.countDocuments().lean(),
        models_1.Channel.find().lean()
    ]);
    res.json({
        ok: true,
        total,
        channels
    });
});
exports.getChannels = getChannels;
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
const uploadVideo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { name, description } = req.body;
    // const user = req.user;
    const { channelId } = req.params;
    // const channel = await Channel.findById(channelId);
    // todo fix validation
    // if( user._id === channel?.userId ){
    // 	return res.status(400).json({
    // 		ok: false,
    // 		message: 'You can not upload videos to this channel',
    // 		user: user._id,
    // 		channel: channel?.userId
    // 	})
    // }
    if (!((_a = req.files) === null || _a === void 0 ? void 0 : _a.file)) {
        return res.status(400).json({
            ok: false,
            message: 'Send the video correctly'
        });
    }
    const { tempFilePath } = (_b = req.files) === null || _b === void 0 ? void 0 : _b.file;
    try {
        // Validar que el canal sea del usuario
        const { secure_url } = yield cloudinary_1.v2.uploader.upload(tempFilePath, { resource_type: 'video' });
        const video = new models_1.Video({ name, description, videoURL: secure_url, channelId });
        yield video.save();
        return res.json({
            ok: true,
            video
        });
    }
    catch (error) {
        console.log(error);
        return res.json({
            ok: false,
            message: error
        });
    }
});
exports.uploadVideo = uploadVideo;
