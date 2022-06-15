import db from "../../config/db.js"

class UserService {
    static async createUser(email, password) {
        try {
            const query = "INSERT INTO users(email, password) VALUES($1, $2);"
            await db.query(query, [email, password])

            return true
        } catch (err) {
            return false
        }
    }

    static async findByEmail(email) {
        try {
            const query = "SELECT * FROM users WHERE email = $1;"
            const res = await db.query(query, [email])

            return res.rows[0]
        } catch (err) {
            return {
                error: "Error finding user"
            }
        }
    }

    static async updatePassword(password, email) {
        try {
            const query = "UPDATE users SET password = $1 WHERE email = $2;"
            await db.query(query, [password, email])

            return { message: "Success" }
        } catch (err) {
            return {
                error: "Error updating password"
            }
        }
    }
}

export default UserService