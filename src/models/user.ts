import mongoose, { model, Model, Schema } from "mongoose";
import { IUser } from "../interfaces";

const userSchema = new Schema({
	name    : {
		type: String,
		required: [true, 'El nombre es requerido']
	},
	email   : {
		type: String,
		unique: true,
		required: [true, 'El email es requerido']
	},
	password: {
		type: String,
		required: [true, 'La contraseña es requerida']
	},

});

userSchema.methods.toJSON = function(){
	const { __v, ...data } = this.toObject();

	return data;
}


const User: Model<IUser> = mongoose.models.User || model('User', userSchema);


export default User;