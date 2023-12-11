import dotenv from 'dotenv';
dotenv.config();
export const port = process.env.PORT || 6666;
export const mongoURL = "mongodb+srv://admin123:12345@atlascluster.opryj2k.mongodb.net/";
export const salt_rounds = "kamenriderDECADE";
export const jwt_secret = "this is jwt serect";
