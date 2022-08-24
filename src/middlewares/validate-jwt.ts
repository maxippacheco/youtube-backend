import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models';


export const validateJWT = async( req: Request, res: Response, next: NextFunction ) => {

	const token =	req.header('auth-token');

	if( !token ){
		return res.status(400).json({
			ok: false,
			message: 'Token not valid'
		})
	}

	try {
		
		const { uid }: any = jwt.verify(token, process.env.PRIVATE_KEY || '');

		const user = await User.findById( uid, '-password' );

		if( !user ){
			return res.status(400).json({
				ok: false,
				message: "The user does not exist"
			})
		}


		req.user = user;
		
		next();

		
	} catch (error) {

		console.log(error);
		

		return res.status(400).json({
			ok: false,
			message: "Token not valid"
		})
	}

}