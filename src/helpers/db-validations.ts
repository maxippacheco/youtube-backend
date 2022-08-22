import { User } from "../models"

export const isValidUserId = async( id:string = "" ) => {

	const is_valid = await User.findById( id );

	if( !is_valid ){
		throw new Error('User does not exist with id ' + id )
	}
}