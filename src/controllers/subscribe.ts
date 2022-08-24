import { Response, Request } from 'express';
import { isValidObjectId } from 'mongoose';
import { Channel } from '../models';


type Data = 
| { ok: boolean; message: string; }

export const subscribeChannel = async( req: Request, res: Response ) => {

	const { userId } = req.params;
	
	if( !isValidObjectId( userId ) ){
		return res.status(400).json({
			ok: false,
			message:'This ID is not valid'
		});
	}

	const [ channelInSession, channelToFollow ] = await Promise.all([
		Channel.findOne( { userId: req.user._id }),
		Channel.findById( userId ),
	]);

	if( !channelInSession ){		
		return res.status(400).json({
			ok: false,
			message: 'There is no channel with this ID'
		})
	}

	if( !channelToFollow ){		
		return res.status(400).json({
			ok: false,
			message: 'There is no channel with this ID'
		})
	}

	if( channelToFollow.subscribers.includes( channelInSession._id )){
		return res.status(400).json({
			ok: false,
			message: 'You already follow this user'
		});
	}

	if( channelInSession.subscribedTo.includes( channelToFollow._id )){
		return res.status(400).json({
			ok: false,
			message: 'This user already follows you'
		})
	}

	channelToFollow.subscribers.push( channelInSession._id );
	channelInSession.subscribedTo.push( channelToFollow._id );

	await Promise.all([
		channelToFollow.save(),
		channelInSession.save()
	]);


	res.json({
		ok: true,
		message:'User succesfully followed',
		channelToFollow,
		channelInSession		
	})	

}


export const unsubscribeChannel = async( req: Request, res: Response ) => {
	
	// userInSession
	const [ userInSession, userToUnfollow ] = await Promise.all([
		Channel.findOne({ userId: req.user._id }),
		Channel.findById(req.params.userId),
	]);

	if( !userInSession ){
		return res.status(400).json({
			ok: false,
			message: 'This user does not exist'
		})
	}


	// Validate if the user follow the user already
	if( !userToUnfollow?.subscribers.includes( userInSession?._id  ) ){
		return res.status(400).json({
			ok: false,
			msg: 'You do not follow this user'
		})
	}

	userInSession?.subscribedTo.splice( userInSession?.subscribedTo.indexOf( userToUnfollow._id ), 1 );
	userToUnfollow.subscribers.splice( userToUnfollow.subscribers.indexOf( userInSession?._id ), 1 );

	await Promise.all([
		userInSession.save(),
		userToUnfollow.save(),

	])

	res.json({
		ok: true,
		user_inSession: userInSession,
		user_toUnfollow: userToUnfollow
	})

}
