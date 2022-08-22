import { Request, Response } from "express"
import { IChannel } from "../interfaces";
import { Channel } from "../models";


type Data = 
| { ok: boolean; message: string; }
| { ok: boolean; channel: IChannel }

export const createChannel = async( req: Request, res: Response<Data> ) => {

	const { name } = req.body;

	const [existChannelWithUser, existChannelName] = await Promise.all([
		Channel.findOne({ userId: req.user._id }),
		Channel.findOne({ name })

	])

	if( existChannelName ){
		return res.status(400).json({
			ok: false,
			message: 'You can not have this user name'
		})
	}

	if( existChannelWithUser ){
		return res.status(400).json({
			ok: false,
			message: 'You can not have two channels'
		})
	}

	const channel = new Channel({ name, userId: req.user._id });

	await channel.save();


	res.json({
		ok: true,
		channel
	})

}