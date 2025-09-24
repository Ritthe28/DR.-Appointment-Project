import { v2 as cloudinary } from "cloudinary";

const connectcloudinary = () => {
    // console.log("hello worldm")
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_SECRET_KEY
    });
    console.log("Cloudinary configured successfully");
    // console.log ("your work will paid off")
    // console.log ("no matter how its going matters ")
};
// connectcloudinary();
export default connectcloudinary;

