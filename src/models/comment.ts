import mongoose, { model, Model, Schema } from "mongoose";
import { IComment } from '../interfaces/channel';

const commentSchema = new Schema({
	description: {
		type: String,
		required: [ true, "The video needs a description"]
	},
	userId: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
	dislikes: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
	likes: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

commentSchema.methods.toJSON = function(){
	const { __v, ...data } = this.toObject();

	return data;
}


const Video: Model<IComment> = mongoose.models.Comment || model('Comment', commentSchema);


export default Video;
