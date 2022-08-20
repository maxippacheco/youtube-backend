
export interface IUser{
	_id     : string;
	name    : string;
	email   : string;
	password: string;
}

// export interface IChannel{
// 		profileImg?: string;
// 		name	     : string;
// 		subscribers: [];
// 		videos?: [
// 			{
// 				name			 : string;
// 				videoURL	 : string;
// 				description: string;
// 				likes			 : [
// 					{
// 						_id: string
// 					}
// 				];
// 				dislikes: [
// 					{
// 						_id: string;
// 					}
// 				];
// 				suscribers: [{ _id: string; }]
// 			}
// 		]
// }