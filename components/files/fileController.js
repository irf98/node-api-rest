import { v4 as uuidv4 } from "uuid"
import nodeFetch from "node-fetch"
import File from "./fileService.js"

class FileController {
    static async uploadFileToBucket(req, res, next) {
        try {
            const data = req.file
            if (!data) {
                return res.status(400).json("Invalid file")
            }

            const filename = uuidv4()
            const upload = await File.uploadFile(data, filename)
            if (upload.error) {
                return res.status(400).json("Error uploading file")
            }

            await File.removeFileFromServer(data)

            res.status(202).json("File upload successfully")
        } catch (err) {
            res.status(500).json("Error")
            next(err)
        }
    }

    static async downloadFileFromBucket(req, res, next) {
        try {
            const data = req.params.key
            if (!data) {
                return res.status(400).json("Invalid key")
            }

            const file = await File.searchFile(data)
            if (file.error) {
                return res.status(404).json("The requested file does not exist")
            }

            const result = await File.downloadFile(data)
            if (result.error) {
                return res.status(400).json("Error downloading file")
            }

            res.status(202).json(result)
        } catch (err) {
            res.status(500).json("Error")
            next(err)
        }
    }

    static async uploadFileFromURL(req, res, next) {
        try {
            const data = req.body.url
            if (!data) {
                return res.status(400).json("Invalid data")
            }

            const image = await nodeFetch(data)
            const filename = uuidv4()

            const upload = await File.upload(image.body, filename)
            if (upload.error) {
                return res.status(400).json("Error uploading image")
            }

            res.status(202).json("Success")
        } catch (err) {
            res.status(500).json("Error")
            next(err)
        }
    }
}

export default FileController