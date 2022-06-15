import express from "express"
import cors from "cors"
import config from "./config/config.js"
import db from "./config/db.js"
import router from "./router/index.js"

const app = express()
const port = config.PORT

app.use(cors(`${config.CORS}`))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

await db.connect()
router(app)

app.listen(port, () => {
    console.log(`Server listening on PORT ${port}`)
})