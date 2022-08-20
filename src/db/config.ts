import mongoose from "mongoose"

export const dbConnection = async() => {

	try {
		await mongoose.connect(process.env.MONGO_URL || '', {}, () => {
			console.log('Database connected');
			
		})
		
	} catch (error) {
		console.log(error);
		console.log('Could not connect to the db');
		
	}


}