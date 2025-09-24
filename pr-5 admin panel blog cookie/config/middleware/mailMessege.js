const nodemailer = require("nodemailer")
module.exports.sendEmail = async (msg) => {
    const transporter = nodemailer.createTransport({
        port: 587,
        service: "gmail",
        secure: false,
        auth: {
            user: "khanparautsav@gmail.com",
            pass: "yjjxnbvxavfyvetu",
        },
    });
    let res = await transporter.sendMail(msg);
    return res;
}
