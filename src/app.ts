
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary'

import { Server } from "./models";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    
});

const server = new Server();

server.listen();