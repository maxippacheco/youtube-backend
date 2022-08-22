import mongoose, { model, Model, Schema } from "mongoose";
import { IChannel } from "../interfaces";

const channelSchema = new Schema({
	name: {
		type: String,
		required: [true, 'Name is required']
	},
	userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
	profileImg: {
		type: String
	},
	subscribers: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
	subscribedTo: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
	videos: [
		{
			name: {
				type: String,
				required: [ true, "The name of the video is requried"]
			},
			videoURL: {
				type: String,
				required: [ true, "The URL of the video is requried"]
			},
			description: {
				type: String,
				required: [ true, "The video needs a description"]
			},
			likes: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
			dislikes: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
		}
	]


});

channelSchema.methods.toJSON = function(){
	const { __v, ...data } = this.toObject();

	return data;
}


const Channel: Model<IChannel> = mongoose.models.Channel || model('Channel', channelSchema);


export default Channel;
