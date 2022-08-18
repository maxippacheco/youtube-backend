import { Request, Response } from "express"


export const loginController = async( req: Request, res: Response) => {
	res.json({ message: 'HELLO WORLD'})
}

export const registerController = async( req: Request, res: Response) => {
	res.json({ message: 'HELLO WORLD'})
}