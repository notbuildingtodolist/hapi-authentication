const nodemailer = require("nodemailer");

const { constants: { Environment: {
  NODEMAILER_USER,
  NODEMAILER_PASSWORD
} } } = require("../config");

module.exports = async (to, subject, text) => {

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: NODEMAILER_USER, // generated ethereal user
      pass: NODEMAILER_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: 'foo@example.com', // sender address
    to, // list of receivers
    subject, // Subject line
    text, // plain text body
  });

  console.log(info);

}
