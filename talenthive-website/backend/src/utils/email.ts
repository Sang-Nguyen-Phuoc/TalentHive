import nodemailer from "nodemailer";

class Email {
  declare user: any;
  declare url: string;
  declare to: string;
  declare name: string;
  declare from: string;

  constructor(user: any, url?: string) {
    this.to = user.email;
    this.name = user.email.split("@")[0];
    this.url = url || "";
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
    await this.send("Welcome to TalentHive!", `Welcome to the TalentHive platform, ${this.name}!`);
  }
  async sendPasswordReset() {
    await this.send(
      "Password Reset",
      `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${this.url}`
    );
  }
  async sendRecoveryCode() {
    await this.send(
      "66493090 is your TalentHive account recovery code",
      `Hi ${this.name},
        We received a request to reset your Facebook password.
        Enter the following password reset code:    
        66493090`
    );
  }
  async informLockedAccount() {
    await this.send(
      "Your TalentHive account has been locked",
      `Hi ${this.name},
        Your account has been locked due to suspicious activity. Please contact us to unlock your account.`
    );
  }
  async informUnlockedAccount() {
    await this.send(
      "Your TalentHive account has been unlocked",
      `Hi ${this.name},
        Your account has been unlocked. You can now login to your account.`,
    );
  }
}

export default Email;
