import nodemailer from "nodemailer";
import config from "../config/config.js";

const transport = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: config.gmailUser,
    pass: config.gmailPassword,
  },
});

const sendMailResetPassword = async (req, res) => {
  try {
    const token = req.params.token;
    const email = req.params.mail;

    const result = await transport.sendMail({
      from: `Ecommerce <${config.gmailUser}>`,
      to: email,
      subject: "Restauración de contraseña",
      html: `
      <div>
        <h1>Abre el siguiente enlace para restaurar la contraseña: </h1>
        <a href="http://http://localhost/:${config.port}/reset-password/${token}/${email}"><button>Restaurar</button></a>
      </div>
      `,
      attachments: [],
    });
    return res.status(200).send({ status: "success", result: result });
  } catch (error) {
    logger.error("Error en mail.controller sendMailResetPassword(): ", error);
    logger.debug("Error en mail.controller sendMailResetPassword(): ", error);
    return res.status(500).send({ status: "error", error: error.message });
  }
};

export default {
  sendMailResetPassword,
};
