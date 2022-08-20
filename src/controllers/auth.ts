import { Request, Response } from "express"
import bcryptjs from 'bcryptjs'
import { User } from '../models';
import { IUser } from "../interfaces";
import { jwt } from "../utils";

type Data = 
| { ok: boolean; message: string; }
| { ok: boolean; user: IUser; }
// todo: optimize the response
| { ok: boolean; user: { email: string; name: string; _id: string; }; token: string }

export const loginController = async( req: Request, res: Response<Data>) => {

	const { email, password } = req.body;

	// validate user
	const isValidUser = await User.findOne({ email });

	if( !isValidUser ){
		return res.status(400).json({
			ok: false,
			message: "Not valid user"
		});
	}
	// validate password

	const validPassword = bcryptjs.compareSync(password, isValidUser.password);		

	if( !validPassword ){
		return res.status(400).json({
			ok: false,
			message: "Password does not match"
		});
	}

	// generate token
	const token = await jwt.createJWT( isValidUser._id );


	res.status(200).json({
		ok: true,
		message: "Login succesfully done",
		user: {
			name: isValidUser.name,
			email: isValidUser.email,
			_id: isValidUser._id,
		},
		token: token
	})



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
	
		const salt = bcryptjs.genSaltSync();
		user.password = bcryptjs.hashSync( password, salt)

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