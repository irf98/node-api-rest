import { Router } from "express"
import searchImages from "./imagesHandler.js"

const router = Router()

function images(app) {
    app.use("/api/images", router)

    router.get("/", searchImages)
}

export default images