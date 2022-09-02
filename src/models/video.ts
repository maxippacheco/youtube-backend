import mongoose, { model, Model, Schema } from "mongoose";
import { IVideo } from '../interfaces/channel';

const videoSchema = new Schema({
	name: {
		type: String,
		required: [ true, "The name of the video is requried"]
	},
	videoURL: {
		type: String,
		required: [ true, "The URL of the video is requried"]
	},
	channelId: {
		type: mongoose.Types.ObjectId,
		ref: 'Channel',
		required: [ true, "The ID of the channel is requried"]
	},
	description: {
		type: String,
		required: [ true, "The video needs a description"]
	},
	likes: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
	dislikes: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
	comments: [{ type: mongoose.Types.ObjectId, ref: 'Comment' }]
}, { timestamps: true });

videoSchema.methods.toJSON = function(){
	const { __v, ...data } = this.toObject();

	return data;
}


const Video: Model<IVideo> = mongoose.models.Video || model('Video', videoSchema);


export default Video;
