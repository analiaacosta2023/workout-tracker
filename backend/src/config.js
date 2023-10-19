import dotenv from 'dotenv'

dotenv.config();

export default {
    port: process.env.PORT,
    mongoUri: process.env.MONG_URI,
    secret: process.env.SECRET
}