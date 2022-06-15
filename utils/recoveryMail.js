import { createTransport } from "nodemailer"
import config from "../config/config.js"

const transporter = createTransport({
    service: "gmail",
    port: 587,
    auth: {
        user: config.EMAIL_USER,
        pass: config.EMAIL_PASS,
    },
})

/* Reemplazar example.com/recovery con el URL real, este template esta a modo de ejemplo */
async function recoveryMail(email) {
    try {
        const mail = {
            from: "API Recovery Team",
            to: email,
            subject: "Password recovery request",
            html: `<h2>Recovery link</h2><br>
                <br>
                <h3>Hello ${email}</h3><br>
                <br>
                <p>Here is the recovery link to reset your password, remember to never share this link to anyone!</p>
                <br>
                <p>http://example.com/recovery</p>
            `,
        }

        return await transporter.sendMail(mail)
    } catch (err) {
        return {
            error: "Error sending recovery email"
        }
    }
}

export default recoveryMail