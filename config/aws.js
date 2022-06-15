import AWS from "aws-sdk"
import config from "./config.js"

const s3 = new AWS.S3({
    accessKeyId: config.AWS_KEY,
    secretAccessKey: config.AWS_SECRET,
})

export default s3