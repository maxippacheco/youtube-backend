import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models';
import { IUser } from '../interfaces';

export interface IValidateToken extends Request {
  user: IUser // or any other type
}


export const validateJWT = async( req: IValidateToken, res: Response, next: NextFunction ) => {

	const token =	req.header('auth-token');

	if( !token ){
		return res.status(400).json({
			ok: false,
			message: 'Token not valid'
		})
	}

	try {
		
		const { uid }: any = jwt.verify(token, process.env.SECRET_KEY || '');

		const user = await User.findById( uid );

		if( !user ){
			return res.status(400).json({
				ok: false,
				message: "The user does not exist"
			})
		}


		req.user = user;
		
		next();

		
	} catch (error) {
		return res.status(400).json({
			ok: false,
			message: "Token not valid"
		})
	}

}