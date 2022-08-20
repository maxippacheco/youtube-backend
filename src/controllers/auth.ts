import { Request, Response } from "express"
import bcryptjs from 'bcryptjs'
import { User } from '../models';
import { IUser } from "../interfaces";

type Data = 
| { ok: boolean; message: string }
| { ok: boolean; user: IUser }

export const loginController = async( req: Request, res: Response) => {
	res.json({ message: 'HELLO WORLD'})
}

export const registerController = async( req: Request, res: Response<Data>) => {
	const { name, email, password } = req.body;

	// email exist in the model
	const isValidEmail = await User.findOne({ email });

	if( isValidEmail ){
		return res.status(400).json({
			ok: false,
			message: 'This email is not valid'
		})
	}

	try {
		const user = new User({ name, email, password });
	
		user.password = bcryptjs.genSaltSync();

		await user.save();
	
		res.json({
			ok: true,
			user
		})
		
	} catch (error) {
		console.log(error);
		return res.status(400).json({
			ok: false,
			message: "Bad Request"
		})
	}

}