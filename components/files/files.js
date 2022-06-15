import { Router } from "express"
import multer from "multer"
import File from "./fileController.js"

const router = Router()
const upload = multer({ dest: "temp/" })

function routes(app) {
    app.use("/api/files", router)

    router.get("/download/:key", File.downloadFileFromBucket)
    router.post("/upload", upload.single("file"), File.uploadFileToBucket)
    router.post("/image-upload", File.uploadFileFromURL)
}

export default routes