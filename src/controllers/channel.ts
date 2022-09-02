import { Request, Response } from "express"
import { v2 as cloudinary } from 'cloudinary'
import { IChannel } from "../interfaces";
import { Channel, Video } from "../models";


type Data = 
| { ok: boolean; message: string; }
| { ok: boolean; channel: IChannel }
| { ok: boolean; channels: IChannel[], total: number }

export const getChannels = async( req: Request, res: Response<Data> ) => {

	const [ total, channels ] = await Promise.all([
		Channel.countDocuments().lean(),
		Channel.find().lean()
	]);

	res.json({
		ok: true,
		total,
		channels
	})

}

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

export const uploadVideo = async( req: Request, res: Response ) => {

	const { name, description } = req.body;

	// const user = req.user;

	const { channelId } = req.params;
	// const channel = await Channel.findById(channelId);


	// todo fix validation
	// if( user._id === channel?.userId ){
	// 	return res.status(400).json({
	// 		ok: false,
	// 		message: 'You can not upload videos to this channel',
	// 		user: user._id,
	// 		channel: channel?.userId
	// 	})
	// }



	if( !req.files?.file ){
		return res.status(400).json({
			ok: false,
			message: 'Send the video correctly'
		})
	}

	const { tempFilePath }: any = req.files?.file;


	try {
		// Validar que el canal sea del usuario
		const { secure_url } = await cloudinary.uploader.upload( tempFilePath, { resource_type: 'video' } );
		
		const video = new Video({ name, description, videoURL: secure_url, channelId });

		await video.save();

		return res.json({
			ok: true,
			video
		})
		
	} catch (error) {
		console.log(error);

		return res.json({
			ok: false,
			message: error
		})
		
	}


}