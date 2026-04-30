import {v2 as cloudinary} from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();
cloudinary.v2.config({
    cloud_name: process.env.clodinary_clod_name,
    api_key: process.env.clodinary_api_key,
    api_secret: process.env.clodinary_api_secret
}); 
export default cloudinary;   
