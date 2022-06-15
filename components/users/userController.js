import bcrypt from "bcrypt"
import User from "./userService.js"
import recoveryMail from "../../utils/recoveryMail.js"
import { generateToken } from "../../utils/jwt.js"

class UserController {
    static async signUp(req, res, next) {
        try {
            const data = req.body
            if (!data) {
                return res.status(400).json("Invalid data")
            }

            const email = data.email
            const password = await bcrypt.hash(data.password, 10)

            const user = await User.findByEmail(email)
            if (user) {
                return res.status(400).json("User already exists")
            }

            const newUser = await User.createUser(email, password)
            if (!newUser) {
                return res.status(400).json("Error creating a new user")
            }

            res.status(201).json("User created Successfully")
        } catch (err) {
            res.status(500).json("Error")
            next(err)
        }
    }

    static async signIn(req, res, next) {
        try {
            const data = req.body
            if (!data) {
                return res.status(400).json("Invalid data")
            }

            const user = await User.findByEmail(data.email)
            if (!user) {
                return res.status(400).json("User does not exist")
            }

            const verified = await bcrypt.compare(data.password, user.password)
            if (!verified) {
                return res.status(401).json("Incorrect password")
            }

            const currentUser = {
                id: user.id,
                email: user.email,
                session: user.session,
            }

            const token = generateToken(currentUser)

            res.status(200).json({
                user: currentUser,
                token: token,
            })
        } catch (err) {
            res.status(500).json("Error")
            next(err)
        }
    }

    static async getUserByEmail(req, res, next) {
        try {
            const data = req.body.email
            if (!data) {
                return res.status(400).json("Invalid data")
            }

            const user = await User.findByEmail(data)
            if (!user) {
                return res.status(401).json("User does not exist")
            }

            res.status(200).json({
                id: user.id,
                email: user.email,
                createdAt: user.createdAt,
            })
        } catch (err) {
            res.status(500).json("Error")
            next(err)
        }
    }

    static async requestPasswordRecovery(req, res, next) {
        try {
            const data = req.body.email
            if (!data) {
                return res.status(400).json("Invalid data")
            }

            const user = await User.findByEmail(data)
            if (!user) {
                return res.status(400).json("User does not exist")
            }

            const mail = await recoveryMail(data)
            if (mail.error) {
                return res.status(400).json("Error sending recovery mail")
            }

            res.status(200).json("Recovery email sent")
        } catch (err) {
            res.status(500).json("Error")
            next(err)
        }
    }

    static async passwordRecovery(req, res, next) {
        try {
            const data = req.body
            if (!data) {
                return res.status(400).json("Invalid data")
            }

            const email = data.email
            const password = data.password

            const user = await User.findByEmail(email)
            if (!user) {
                return res.status(400).json("User does not exist")
            }

            const verified = await bcrypt.compare(password, user.password)
            if (verified) {
                return res.status(400).json("Set a different password from your current one")
            }

            const newPassword = await bcrypt.hash(password, 10)

            const update = await User.updatePassword(newPassword, email)
            if (update.error) {
                return res.status(400).json("Error updating password")
            }

            res.status(200).json("Password successfully updated")
        } catch (err) {
            res.status(500).json("Error")
            next(err)
        }
    }

    static async protectedRoute(req, res, next) {
        try {
           res.status(200).json("Your token is valid, this is a protected route")
        } catch (err) {
            res.status(500).json("Error")
            next(err)
        }
    }
}

export default UserController