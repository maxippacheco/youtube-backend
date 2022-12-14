// Generated by https://quicktype.io



export interface IChannel {
	name:					string;
	profileImg?:  string;
	userId:       string;
	subscribers:  any[];
	subscribedTo: any[];
	_id:          string;
	videos:       IVideo[];
}

export interface IVideo {
	name: 			 string;
	videoURL: 	 string;
	description: string;
	likes: 			 string[];
	dislikes: 	 string[];
	channelId:   string;
}

export interface IComment {
	userId: 	   string;
	description: string;
	likes: 			 string[];
	dislikes: 	 string[];
}