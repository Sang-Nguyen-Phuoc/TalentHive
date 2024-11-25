import nodemailer from "nodemailer";

class Email {
    declare user: any;
    declare url: string;
    declare to: string;
    declare name: string;
    declare from: string;
    
    constructor(user: any, url: string) {
        this.to = user.email;
        this.name = user.email.split("@")[0];
        this.url = url;
        this.from = `TalentHive`;
    }

    newTransport() {
        return nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
    }

    async send(subject: string, message: string) {
        const mailOptions = {
            from: this.from,
            to: this.to,
            subject,
            text: message,
        };

        await this.newTransport().sendMail(mailOptions);
    }

    async sendWelcome() {
        await this.send(
            "Welcome to TalentHive!",
            `Welcome to the TalentHive platform, ${this.name}!`
        );
    }
    async sendPasswordReset() {
        await this.send(
            "Password Reset",
            `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${this.url}`
        );
    }
}

export default Email;
