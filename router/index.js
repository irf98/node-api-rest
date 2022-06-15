import users from "../components/users/users.js"
import files from "../components/files/files.js"
import images from "../components/images/images.js"

function router(app) {
    users(app)
    files(app)
    images(app)

    app.use((req, res, next) => {
        res.status(404)
        res.json({
            error: {
                title: "Not Found",
                status: 404,
                type: "Invalid Request",
            },
            message: "The requested route does not exist.",
        })
        next()
    })
}

export default router