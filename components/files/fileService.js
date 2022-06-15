import fs from "fs"
import util from "util"
import s3 from "../../config/aws.js"
import config from "../../config/config.js"

class FileService {
    static async uploadFile(file, filename) {
        try {
            const fileStream = fs.createReadStream(file.path)

            return await this.upload(fileStream, filename)
        } catch (err) {
            return {
                error: "Error uploading file"
            }
        }
    }

    static async downloadFile(key) {
        try {
            const params = {
                Key: key,
                Bucket: config.AWS_BUCKET,
            }

            return await s3.getObject(params).createReadStream()
        } catch (err) {
            return {
                error: "Error downloading file"
            }
        }
    }

    static async searchFile(key) {
        try {
            const params = {
                Key: key,
                Bucket: config.AWS_BUCKET,
            }

            return await s3.headObject(params).promise();
        } catch (err) {
            return {
                error: "Error getting file"
            }
        }
    }

    static async removeFileFromServer(file) {
        try {
            const unlinkFile = util.promisify(fs.unlink)

            return await unlinkFile(file.path)
        } catch (err) {
            return {
                error: err
            }
        }
    }

    static async upload(data, filename) {
        try {
            const params = {
                Body: data,
                Bucket: config.AWS_BUCKET,
                Key: filename,
            }

            return await s3.upload(params).promise()
        } catch (err) {
            return {
                error: "Error updating file"
            }
        }
    }
}

export default FileService