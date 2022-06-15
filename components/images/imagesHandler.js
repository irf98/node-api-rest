import { createApi } from "unsplash-js"
import nodeFetch from "node-fetch"
import config from "../../config/config.js"

const unsplash = createApi({
    accessKey: config.UNS_ACCESS,
    fetch: nodeFetch,
})

async function searchImages(req, res, next) {
    try {
        const { title } = req.query
        if (!title) {
            return res.status(400).json("Invalid data")
        }

        const query = await unsplash.search.getPhotos({
            query: title,
            page: 1,
            perPage: 10,
            orderBy: "relevant",
        })

        res.status(200).json(query)
    } catch (err) {
        res.status(500).json(err)
        next(err)
    }
}

export default searchImages