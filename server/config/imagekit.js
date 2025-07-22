import ImageKit from "imagekit";
import dotenv from "dotenv";
dotenv.config(); // تأكد إنه محطوط قبل استخدام process.env

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

export default imagekit;
