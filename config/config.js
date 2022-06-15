import dotenv from "dotenv"

dotenv.config()

const config = {
    PORT: process.env.PORT,
    CORS: process.env.CORS,
    SECRET: process.env.SECRET,

    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS,

    AWS_KEY: process.env.AWS_KEY,
    AWS_SECRET: process.env.AWS_SECRET,
    AWS_BUCKET: process.env.AWS_BUCKET,

    UNS_ACCESS: process.env.UNS_ACCESS,
    UNS_SECRET: process.env.UNS_SECRET,
}

export default config