import jwt from 'jsonwebtoken';

export const createJWT = ( uid:string= "" ): Promise<string> => {

	return new Promise((resolve, reject) => {

		const payload = { uid };

		jwt.sign(payload, process.env.PRIVATE_KEY || '', (error, token) => {
			if( error ){
				reject("no se pudo resolver el token")
			}else{
				resolve(token || '');
			}

		})

	})

}
